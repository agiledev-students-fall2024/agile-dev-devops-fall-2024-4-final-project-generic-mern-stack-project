const express = require('express');
const router = express.Router();

// Store meetings in memory for now (will be replaced with database later)
const meetings = new Map();

// GET /meeting/:id - Fetch meeting room by ID
router.get('/:id', (req, res) => {
    const meetingId = req.params.id;
    const meeting = meetings.get(meetingId);
    if (!meeting) {
        return res.status(404).json({ error: 'Meeting not found' });
    }
    res.json(meeting);
});

// POST /meeting - Create a new meeting room
router.post('/', (req, res) => {
    // Generate a random 9-digit meeting ID
    const meetingId = Math.random().toString().slice(2, 11);
   
    // Create new meeting room with default settings
    const newMeeting = {
        id: meetingId,
        createdAt: new Date().toISOString(),
        participants: [],
        settings: {
            allowChat: true,
            allowCodeEditor: true,
            allowWhiteboard: true,
            allowScreenShare: true
        }
    };

    // Store meeting in our temporary Map
    meetings.set(meetingId, newMeeting);
    res.status(201).json(newMeeting);
});

module.exports = router;