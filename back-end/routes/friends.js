const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Friendship = require('../models/Friendship');
const FriendRequest = require('../models/FriendRequest');
const Blocked = require('../models/Blocked');

const CURRENT_USER_ID = '1';

// 1. FETCH AVAILABLE USERS (ex. Blocked & Users that sent me a friend request)
router.get('/users', async (req, res) => {
  try {
    const blockedUsers = await Blocked.find({ blocker: CURRENT_USER_ID }).select('blocked');
    const blockedIds = blockedUsers.map(block => block.blocked);
    const incomingRequests = await FriendRequest.find({ to: CURRENT_USER_ID }).select('from');
    const requestIds = incomingRequests.map(request => request.from);
    const excludedIds = [...blockedIds, ...requestIds];

    const users = await User.find({ _id: { $nin: excludedIds, $ne: CURRENT_USER_ID } });

    res.json(users.map(user => ({ id: user._id, name: user.name, username: user.username })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. FETCH FRIENDSHIPS
router.get('/friends', async (req, res) => {
  try {
    const friendships = await Friendship.find({
      $or: [{ user1: CURRENT_USER_ID }, { user2: CURRENT_USER_ID }]
    }).populate('user1 user2');

    const friendList = friendships.map(friendship => {
      const friend = friendship.user1._id.equals(CURRENT_USER_ID) ? friendship.user2 : friendship.user1;
      return { id: friend._id, name: friend.name, username: friend.username };
    });

    res.json(friendList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. REMOVE A FRIEND
router.post('/remove/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await Friendship.deleteOne({
      $or: [
        { user1: CURRENT_USER_ID, user2: userId },
        { user2: CURRENT_USER_ID, user1: userId }
      ]
    });
    res.status(200).json({ message: 'Friend removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. BLOCK A USER
router.post('/block/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await Friendship.deleteOne({
      $or: [
        { user1: CURRENT_USER_ID, user2: userId },
        { user2: CURRENT_USER_ID, user1: userId }
      ]
    });

    const isBlocked = await Blocked.findOne({ blocker: CURRENT_USER_ID, blocked: userId });
    if (!isBlocked) {
      await Blocked.create({ blocker: CURRENT_USER_ID, blocked: userId });
    }

    res.status(200).json({ message: 'User blocked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. ADD A FRIEND (SEND AN OUTGOING FRIEND REQUEST)
router.post('/request/:id', async (req, res) => {
  const friendId = req.params.id;
  try {
    const existingRequest = await FriendRequest.findOne({ from: CURRENT_USER_ID, to: friendId });
    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    await FriendRequest.create({ from: CURRENT_USER_ID, to: friendId });
    res.status(200).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. FETCH ALL FRIEND REQUESTS
router.get('/requests', async (req, res) => {
  try {
    const incomingRequests = await FriendRequest.find({ to: CURRENT_USER_ID }).populate('from');
    const outgoingRequests = await FriendRequest.find({ from: CURRENT_USER_ID }).populate('to');

    res.json({
      incomingRequests: incomingRequests.map(request => ({
        id: request._id,
        fromUser: { id: request.from._id, name: request.from.name, username: request.from.username }
      })),
      outgoingRequests: outgoingRequests.map(request => ({
        id: request._id,
        toUser: { id: request.to._id, name: request.to.name, username: request.to.username }
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. CANCEL AN OUTGOING REQUEST
router.post('/requests/cancel/:id', async (req, res) => {
  const requestId = req.params.id;
  try {
    await FriendRequest.deleteOne({ _id: requestId, from: CURRENT_USER_ID });
    res.status(200).json({ message: 'Friend request canceled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. ACCEPT AN INCOMING REQUEST
router.post('/requests/accept/:id', async (req, res) => {
  const requestId = req.params.id;
  try {
    await Friendship.create({ user1: request.from, user2: request.to });
    await FriendRequest.deleteOne({ _id: requestId });

    res.status(200).json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. DECLINE AN INCOMING REQUEST
router.post('/requests/decline/:id', async (req, res) => {
  const requestId = req.params.id;
  try {
    await FriendRequest.deleteOne({ _id: requestId, to: CURRENT_USER_ID });
    res.status(200).json({ message: 'Friend request declined successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 10. FETCH ALL BLOCKED USERS
router.get('/blocked', async (req, res) => {
  try {
    const blockedUsers = await Blocked.find({ blocker: CURRENT_USER_ID }).populate('blocked');

    const blockedList = blockedUsers.map(block => ({
      id: block.blocked._id,
      name: block.blocked.name,
      username: block.blocked.username
    }));

    res.json(blockedList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 11. UNBLOCK A USER
router.post('/unblock/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const blockedEntry = await Blocked.findOne({ blocker: CURRENT_USER_ID, blocked: userId });
    if (!blockedEntry) {
      return res.status(404).json({ message: 'User is not blocked' });
    }

    await Blocked.deleteOne({ blocker: CURRENT_USER_ID, blocked: userId });

    res.status(200).json({ message: 'User unblocked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
