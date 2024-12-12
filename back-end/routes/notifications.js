const express = require('express');
const User = require('../models/User');
const authenticateToken = require('./authroutes');

const router = express.Router();

// AddNotification func
const addNotification = async (userId, message) => {
    console.log("addNotification triggered");
    try {
        await User.findByIdAndUpdate(
            userId,
            { $push: { notifications: { message, createdAt: new Date() } } },
            { new: true }
        );
        console.log('Notification added successfully!');
    } catch (error) {
        console.error('Error adding notification:', error);
    }
};

// route for getting notif
router.get('/', authenticateToken, async (req, res) => {
    try {
        const notifications = await User.findById(req.user.id).select('notifications');
        if (!notifications) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ notifications: notifications.notifications });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

// route for deleting notif
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { notifications: { _id: req.params.id } } },
            { new: true }
        );
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ message: 'Notification removed', notifications: user.notifications });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove notification' });
    }
});

module.exports = router;
