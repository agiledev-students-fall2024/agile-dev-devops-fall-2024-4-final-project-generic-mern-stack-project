const express = require('express');
const router = express.Router();

let friendsList = [
    { id: 1, userId: 123, name: 'Alice' },
    { id: 2, userId: 123, name: 'Bob' },
    { id: 3, userId: 123, name: 'Charlie' },
];

// Get all friends for a specific user
router.get('/friends/user/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const userFriends = friendsList.filter(friend => friend.userId === userId);
    res.json(userFriends);
});

// Add a new friend
router.post('/friends', (req, res) => {
    const { userId, name } = req.body;
    if (!userId || !name) {
        return res.status(400).json({ message: 'User ID and friend name are required' });
    }
    const newFriend = {
        id: friendsList.length + 1,
        userId: parseInt(userId),
        name,
    };
    friendsList.push(newFriend);
    res.status(201).json(newFriend);
});

// Remove a friend
router.delete('/friends/user/:userId/:name', (req, res) => {
    const userId = parseInt(req.params.userId);
    const name = req.params.name;
    const friendIndex = friendsList.findIndex(friend => friend.userId === userId && friend.name === name);

    if (friendIndex !== -1) {
        friendsList.splice(friendIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Friend not found' });
    }
});

// Search friends by keyword
router.get('/friends/search/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const { keyword } = req.query;
    
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword query parameter is required' });
    }

    const matchingFriends = friendsList.filter(
        friend => friend.userId === userId && friend.name.toLowerCase().includes(keyword.toLowerCase())
    );
    res.json(matchingFriends);
});


module.exports = router;
