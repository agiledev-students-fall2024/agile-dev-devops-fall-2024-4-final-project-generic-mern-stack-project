const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');
const Friendship = require('../models/Friendship');
const FriendRequest = require('../models/FriendRequest');
const Blocked = require('../models/Blocked');

// const CURRENT_USER_ID = '673f858d5fc4b9efe8ac6266';

// 1. FETCH AVAILABLE USERS (ex. Blocked & Users that sent me a friend request)
router.get('/potential-friends', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const blockedUsers = await Blocked.find({ blocker: req.user.id }).select('blocked');
    const blockedIds = blockedUsers.map(block => block.blocked);
    const incomingRequests = await FriendRequest.find({ to: req.user.id }).select('from');
    const incomingRequestIds = incomingRequests.map(request => request.from);
    const outgoingRequests = await FriendRequest.find({ from: req.user.id }).select('to');
    const outgoingRequestIds = outgoingRequests.map(request => request.to);
    const currentFriends = await Friendship.find({
      $or: [{ user1: req.user.id }, { user2: req.user.id }]
    }).select('user1 user2');
    const friendIds = currentFriends.map(friendship =>
      friendship.user1.toString() === req.user.id ? friendship.user2 : friendship.user1
    );
    const excludedIds = [...blockedIds, ...incomingRequestIds, ...outgoingRequestIds, ...friendIds, req.user.id];
    const users = await User.find({ _id: { $nin: excludedIds } });

    res.json(users.map(user => ({ id: user._id, name: user.name, username: user.username })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. FETCH FRIENDSHIPS
router.get('/friends', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const friendships = await Friendship.find({
      $or: [{ user1: req.user.id }, { user2: req.user.id }]
    }).populate('user1 user2');

    const friendList = friendships.map(friendship => {
      const friend = friendship.user1._id.equals(req.user.id) ? friendship.user2 : friendship.user1;
      return { id: friend._id, name: friend.name, username: friend.username };
    });

    res.json(friendList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. REMOVE A FRIEND
router.post('/remove/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userId = req.params.id;
  try {
    await Friendship.deleteOne({
      $or: [
        { user1: req.user.id, user2: userId },
        { user2: req.user.id, user1: userId }
      ]
    });
    res.status(200).json({ message: 'Friend removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. BLOCK A USER
router.post('/block/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userId = req.params.id;
  try {
    // REMOVE CURRENT FRIENDSHIPS
    await Friendship.deleteOne({
      $or: [
        { user1: req.user.id, user2: userId },
        { user2: req.user.id, user1: userId }
      ]
    });

    // REMOVE PENDING FRIEND REQUESTS
    await FriendRequest.deleteMany({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id }
      ]
    });

    // CHECK IF THE USER IS ALREADY BLOCKED
    const isBlocked = await Blocked.findOne({ blocker: req.user.id, blocked: userId });
    if (!isBlocked) {
      // ADD USER TO BLOCKED LIST
      await Blocked.create({ blocker: req.user.id, blocked: userId });
    }

    res.status(200).json({ message: 'User blocked successfully, and all related requests were removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 5. ADD A FRIEND (SEND AN OUTGOING FRIEND REQUEST)
router.post('/request/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const friendId = req.params.id;
  try {
    const existingRequest = await FriendRequest.findOne({ from: req.user.id, to: friendId });
    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    await FriendRequest.create({ from: req.user.id, to: friendId });
    res.status(200).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. FETCH ALL FRIEND REQUESTS
router.get('/requests', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const incomingRequests = await FriendRequest.find({ to: req.user.id }).populate('from');
    const outgoingRequests = await FriendRequest.find({ from: req.user.id }).populate('to');

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
router.post('/requests/cancel/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const requestId = req.params.id;
  try {
    await FriendRequest.deleteOne({ _id: requestId, from: req.user.id });
    res.status(200).json({ message: 'Friend request canceled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. ACCEPT AN INCOMING REQUEST
router.post('/requests/accept/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const requestId = req.params.id;
  try {
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found' });
    }
    await Friendship.create({ user1: friendRequest.from, user2: friendRequest.to });
    await FriendRequest.deleteOne({ _id: requestId });
    res.status(200).json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. DECLINE AN INCOMING REQUEST
router.post('/requests/decline/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const requestId = req.params.id;
  try {
    await FriendRequest.deleteOne({ _id: requestId, to: req.user.id });
    res.status(200).json({ message: 'Friend request declined successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 10. FETCH ALL BLOCKED USERS
router.get('/blocked', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const blockedUsers = await Blocked.find({ blocker: req.user.id }).populate('blocked');

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
router.post('/unblock/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userId = req.params.id;

  try {
    const blockedEntry = await Blocked.findOne({ blocker: req.user.id, blocked: userId });
    if (!blockedEntry) {
      return res.status(404).json({ message: 'User is not blocked' });
    }

    await Blocked.deleteOne({ blocker: req.user.id, blocked: userId });

    res.status(200).json({ message: 'User unblocked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
