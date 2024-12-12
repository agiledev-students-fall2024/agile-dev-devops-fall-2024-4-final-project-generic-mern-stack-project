const express = require('express');
const router = express.Router();

let friendsList = [
    { id: 1, userId: 123, name: 'Alice' },
    { id: 2, userId: 123, name: 'Bob' },
    { id: 3, userId: 123, name: 'Charlie' },
];

// Get all friends for a specific user
router.get('/user/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'User ID must be a number' });
    }
    const userFriends = friendsList.filter(friend => friend.userId === userId);
    res.json(userFriends);
});

// add a new friend
router.post('/', async (req, res) => {
    // console.log("POST / route hit");
    const { userId, name } = req.body;
    if (!userId || !name) {
        return res.status(400).json({ message: 'User ID and friend name are required' });
    }
    if (typeof userId !== 'number') {
        return res.status(400).json({ error: 'User ID must be a number' });
    }
    const newFriend = {
        id: friendsList.length + 1,
        userId: parseInt(userId),
        name,
    };
    friendsList.push(newFriend);
    
    // trigger notification for user added
    try {
        // add notification to user's notification stack
        await addNotification(userId, `You have a new friend: ${name}`);
        console.log("test2");
        res.status(201).json(newFriend);
        console.log("test3");
    } catch (error) {
        console.error('Error adding notification:', error);
        res.status(500).json({ error: 'Failed to send notification' });
    }
});

// Remove a friend
router.delete('/user/:userId/:name', (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'User ID must be a number' });
    }
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
router.get('/search/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'User ID must be a number' });
    }
    const keyword = req.query.keyword;
    
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword query parameter is required' });
    }

    const matchingFriends = friendsList.filter(
        friend => friend.userId === userId && friend.name.toLowerCase().includes(keyword.toLowerCase())
    );
    res.json(matchingFriends);
});

module.exports = router;