// routes/join-create-meeting.js
const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');
const fb = require('../services/firebase');

// Get list of past meetings
router.get('/past/list', async (req, res) => {
    try {
        const meetings = await Meeting.find()
            .sort({ createdAt: -1 }) // Sort by most recent first
            .limit(10) // Limit to last 10 meetings
            .select('meetingId createdAt codeHistory status') // Select specific fields
            .exec();

        const formattedMeetings = meetings.map(meeting => ({
            meetingId: meeting.meetingId,
            createdAt: meeting.createdAt,
            status: meeting.status,
            codeEditor: meeting.codeHistory?.length > 0 ? {
                language: meeting.codeHistory[meeting.codeHistory.length - 1].language,
                lastUpdate: meeting.codeHistory[meeting.codeHistory.length - 1].timestamp
            } : null
        }));

        res.json(formattedMeetings);
    } catch (error) {
        console.error('Error fetching past meetings:', error);
        res.status(500).json({ error: 'Failed to fetch past meetings' });
    }
});

// Create new meeting
router.post('/', async (req, res) => {
    try {
        // Generate a random 9-digit meeting ID
        const meetingId = Math.random().toString().slice(2, 11);
        
        // Create meeting in MongoDB
        const meeting = new Meeting({
            meetingId,
            status: 'active',
            participants: [],
            codeHistory: []
        });

        await meeting.save();

        res.status(201).json({ 
            meetingId,
            createdAt: meeting.createdAt,
            status: meeting.status
        });
    } catch (error) {
        console.error('Error creating meeting:', error);
        res.status(500).json({ error: 'Failed to create meeting' });
    }
});

// Get specific meeting
router.get('/:id', async (req, res) => {
    try {
        const { id: meetingId } = req.params;
        const meeting = await Meeting.findOne({ meetingId });
        
        if (!meeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }

        res.json({
            meetingId: meeting.meetingId,
            createdAt: meeting.createdAt,
            status: meeting.status,
            codeEditor: meeting.codeHistory?.length > 0 ? {
                language: meeting.codeHistory[meeting.codeHistory.length - 1].language,
                code: meeting.codeHistory[meeting.codeHistory.length - 1].code
            } : null
        });
    } catch (error) {
        console.error('Error fetching meeting:', error);
        res.status(500).json({ error: 'Failed to fetch meeting' });
    }
});

// End meeting
router.post('/:id/end', async (req, res) => {
    try {
        const { id: meetingId } = req.params;
        const meeting = await Meeting.findOne({ meetingId });
        
        if (!meeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }

        meeting.status = 'ended';
        meeting.endedAt = new Date();
        await meeting.save();

        res.json({ message: 'Meeting ended successfully' });
    } catch (error) {
        console.error('Error ending meeting:', error);
        res.status(500).json({ error: 'Failed to end meeting' });

    }
});

module.exports = router;