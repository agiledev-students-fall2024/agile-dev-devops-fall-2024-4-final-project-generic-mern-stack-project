// routes/join-create-meeting.js
const express = require('express');
const router = express.Router();
const meetingStorageService = require('../services/meetingStorageService');

// Initialize MongoDB connection when server starts
(async () => {
    try {
        await meetingStorageService.connect();
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
})();

// GET /meeting/:id - Fetch meeting room by ID
router.get('/:id', async (req, res) => {
    try {
        const meetingId = req.params.id;
        const meeting = await meetingStorageService.getMeeting(meetingId);
        
        if (!meeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }
        
        res.json(meeting);
    } catch (error) {
        console.error('Error fetching meeting:', error);
        res.status(500).json({ error: 'Failed to fetch meeting' });
    }
});

// POST /meeting - Create a new meeting room
router.post('/', async (req, res) => {
    try {
        // Generate a random 9-digit meeting ID
        const meetingId = Math.random().toString().slice(2, 11);
        const meeting = await meetingStorageService.createMeeting(meetingId);
        res.status(201).json(meeting);
    } catch (error) {
        console.error('Error creating meeting:', error);
        res.status(500).json({ error: 'Failed to create meeting' });
    }
});

// GET /meeting/past - Get past meetings
router.get('/past/list', async (req, res) => {
    try {
        const pastMeetings = await meetingStorageService.getPastMeetings();
        res.json(pastMeetings);
    } catch (error) {
        console.error('Error fetching past meetings:', error);
        res.status(500).json({ error: 'Failed to fetch past meetings' });
    }
});

module.exports = router;