// routes/code.js
const express = require('express');
const router = express.Router();
const { collection, onSnapshot } = require('firebase/firestore');
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

// Stream updates route
router.get('/:meetingId/stream', (req, res) => {
    const { meetingId } = req.params;

    // Set headers for SSE
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
    });

    // Send initial connection message
    res.write('data: {"type":"connected"}\n\n');

    // Set up Firebase listener
    const messagesRef = collection(codeService.db, 'meetings', meetingId, 'messages');
    const unsubscribe = onSnapshot(messagesRef, 
        (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added' || change.type === 'modified') {
                    const data = change.doc.data();
                    res.write(`data: ${JSON.stringify(data)}\n\n`);
                }
            });
        },
        (error) => {
            console.error('Snapshot listener error:', error);
            res.write(`data: ${JSON.stringify({ type: 'error', message: error.message })}\n\n`);
        }
    );

    // Clean up when client disconnects
    req.on('close', () => {
        unsubscribe();
    });
});

module.exports = router;