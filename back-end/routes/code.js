// routes/code.js
const express = require('express');
const router = express.Router();
const codeService = require('../services/codeService');

// Get code history for a meeting
router.get('/:meetingId', async (req, res) => {
    try {
        const { meetingId } = req.params;
        const codeHistory = await codeService.getCodeHistory(meetingId);
        res.json(codeHistory);
    } catch (error) {
        console.error('Error getting code history:', error);
        res.status(500).json({ error: 'Failed to get code history' });
    }
});

// Send code update
router.post('/:meetingId', async (req, res) => {
    try {
        const { meetingId } = req.params;
        const { code, language } = req.body;
        const timestamp = Date.now();

        const success = await codeService.sendCodeUpdate(
            meetingId,
            code,
            language,
            timestamp
        );

        if (success) {
            res.status(201).json({ message: 'Code update sent successfully' });
        } else {
            res.status(500).json({ error: 'Failed to send code update' });
        }
    } catch (error) {
        console.error('Error sending code update:', error);
        res.status(500).json({ error: 'Failed to send code update' });
    }
});

module.exports = router;