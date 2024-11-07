const express = require('express');
const router = express.Router();

// GET DATA
const users = require('../fillerData/users');
const friendships = require('../fillerData/friendships');
const friendRequests = require('../fillerData/friendRequests');
const blocked = require('../fillerData/blocked');

const CURRENT_USER_ID = 1;  // REPLACE WITH DYNAMIC ID LATER

// FETCH FRIENDS LIST FOR CURRENT USER
router.get('/', (req, res) => {
  const friendIds = friendships
    .filter(f => f.user_id_1 === CURRENT_USER_ID || f.user_id_2 === CURRENT_USER_ID)
    .map(f => f.user_id_1 === CURRENT_USER_ID ? f.user_id_2 : f.user_id_1);

  const blockedIds = blocked
    .filter(b => b.blocker_id === CURRENT_USER_ID || b.blocked_id === CURRENT_USER_ID)
    .map(b => b.blocker_id === CURRENT_USER_ID ? b.blocked_id : b.blocker_id);

  const friendList = users
    .filter(user => friendIds.includes(user.id) && !blockedIds.includes(user.id))
    .map(user => ({ id: user.id, name: user.name, username: user.username }));

  res.json(friendList);
});

// BLOCK A USER
router.post('/block/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  blocked.push({ id: blocked.length + 1, blocker_id: CURRENT_USER_ID, blocked_id: userId });
  res.status(200).json({ message: 'User blocked successfully' });
});

// REMOVE A FRIEND
router.post('/remove/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = friendships.findIndex(f => 
    (f.user_id_1 === CURRENT_USER_ID && f.user_id_2 === userId) || 
    (f.user_id_1 === userId && f.user_id_2 === CURRENT_USER_ID)
  );
  if (index !== -1) friendships.splice(index, 1);
  res.status(200).json({ message: 'Friend removed successfully' });
});

// FOR ADD FRIEND PAGE
router.get('/potential-friends', (req, res) => {
    // GET ID OF ALL FRIENDS
    const friendIds = friendships
        .filter(f => f.user_id_1 === CURRENT_USER_ID || f.user_id_2 === CURRENT_USER_ID)
        .map(f => (f.user_id_1 === CURRENT_USER_ID ? f.user_id_2 : f.user_id_1));

    // FIND USERS NOT ME OR FRIENDS WITH ME ALREADY
    const potentialFriends = users.filter(user => 
        user.id !== CURRENT_USER_ID && !friendIds.includes(user.id)
    );

    res.json(potentialFriends);
});

// ADD A FRIEND
router.post('/request/:id', (req, res) => {
    const friendId = parseInt(req.params.id);

    // AVOID DUPLICATE REQUEST
    const existingRequest = friendRequests.find(
        req => req.from_user_id === CURRENT_USER_ID && req.to_user_id === friendId
    );
    
    if (existingRequest) {
        return res.status(400).json({ message: 'Friend request already sent' });
    }

    // CREATE NEW FRIEND REQUEST
    const newRequest = {
        id: friendRequests.length + 1,
        from_user_id: CURRENT_USER_ID,
        to_user_id: friendId,
        created_at: new Date().toISOString()
    };
    friendRequests.push(newRequest);

    res.status(200).json({ message: 'Friend request sent successfully' });
});

// FETCH ALL FRIEND REQUESTS FOR CURRENT USER
router.get('/requests', (req, res) => {
    const incomingRequests = friendRequests
        .filter(request => request.to_user_id === CURRENT_USER_ID)
        .map(request => {
            const fromUser = users.find(user => user.id === request.from_user_id);
            return {
                ...request,
                fromUser: fromUser ? { 
                    id: fromUser.id,
                    name: fromUser.name,
                    username: fromUser.username
                } : null
            };
        });

    const outgoingRequests = friendRequests
        .filter(request => request.from_user_id === CURRENT_USER_ID)
        .map(request => {
            const toUser = users.find(user => user.id === request.to_user_id);
            return {
                ...request,
                toUser: toUser ? {
                    id: toUser.id,
                    name: toUser.name,
                    username: toUser.username
                } : null
            };
        });
    
    res.json({ incomingRequests, outgoingRequests });
});

// ACCEPTING A FRIEND REQUEST
router.post('/requests/accept/:id', (req, res) => {
    const requestId = parseInt(req.params.id);
    const requestIndex = friendRequests.findIndex(request => request.id === requestId);
    
    if (requestIndex === -1) return res.status(404).json({ message: 'Request not found' });

    const request = friendRequests[requestIndex];
    friendships.push({
        id: friendships.length + 1,
        user_id_1: request.from_user_id,
        user_id_2: request.to_user_id,
        created_at: new Date().toISOString()
    });

    friendRequests.splice(requestIndex, 1); // REMOVE THE ACCEPTED REQUEST
    res.json({ message: 'Friend request accepted' });
});

// DECLINING A FRIEND REQUEST
router.post('/requests/decline/:id', (req, res) => {
    const requestId = parseInt(req.params.id);
    const requestIndex = friendRequests.findIndex(request => request.id === requestId);

    if (requestIndex === -1) return res.status(404).json({ message: 'Request not found' });

    friendRequests.splice(requestIndex, 1); // REMOVE THE DECLINE REQUEST
    res.json({ message: 'Friend request declined' });
});

// CANCEL A SENT REQUEST
router.post('/requests/cancel/:id', (req, res) => {
    const requestId = parseInt(req.params.id);
    const requestIndex = friendRequests.findIndex(request => request.id === requestId);

    if (requestIndex === -1) return res.status(404).json({ message: 'Request not found' });

    friendRequests.splice(requestIndex, 1); // REMOVE THE SENT REQUEST
    res.json({ message: 'Friend request canceled' });
});

// FETCH ALL BLOCKED USERS
router.get('/blocked', (req, res) => {
    const blockedUsers = blocked
      .filter(b => b.blocker_id === CURRENT_USER_ID)
      .map(b => {
        const blockedUser = users.find(user => user.id === b.blocked_id);
        return blockedUser ? { id: blockedUser.id, name: blockedUser.name, username: blockedUser.username } : null;
      })
      .filter(Boolean);
  
    res.json(blockedUsers);
});

// UNBLOCK A USER
router.post('/unblock/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = blocked.findIndex(b => b.blocker_id === CURRENT_USER_ID && b.blocked_id === userId);
  
    if (index !== -1) {
      blocked.splice(index, 1); // REMOVE FROM THE BLOCKED LIST
      res.status(200).json({ message: 'User unblocked successfully' });
    } else {
      res.status(404).json({ message: 'Blocked user not found' });
    }
});

module.exports = router;
