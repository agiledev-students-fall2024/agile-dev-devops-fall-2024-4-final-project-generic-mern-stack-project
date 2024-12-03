const express = require('express');
const router = express.Router();
const fb = require('../services/firebaseApi');

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

    fb.createMeeting(meetingId, newMeeting);


    res.status(201).json(newMeeting);
});

// POST /meeting/:id/save - save the meeting data at that point of time
router.post('/:id/save', async (req, res) => {
    const meetingId = req.params.id;
    const meeting = await fb.getMeeting(meetingId);
    if (!meeting) {
        return res.status(404).json({
            error: 'Meeting not found',
            success: false
        });
    }

    // save meeting to mongo
    try {
        const Meeting = require('../models/Meeting');
        const meetingModel = new Meeting(savedMeeting);
        const savedMeeting = await meetingModel.save();

        res.json({
            message: 'Meeting saved successfully',
            id: meetingId,
            success: true,
            meeting: savedMeeting
        });
    } catch (error) {
        console.error('Error saving meeting:', error);
        res.status(500).json({ error: 'Failed to save meeting' });
    }
});

module.exports = router;