// routes/chatRoutes.js
/**
 * Chat Routes
 * This file exposes RESTful API endpoints for chat functionality.
 * Available endpoints:
 * - POST /api/chat/create: Create a new chat for a meeting
 * - POST /api/chat/message: Add a message to an existing chat
 * - GET /api/chat/:meetingId: Retrieve chat history for a specific meeting
 */
const express = require('express');
const ChatService = require('../services/chatService');
const router = express.Router();

router.post('/create', async (req, res) => {
    const { meetingId, participants } = req.body;

    try {
        const chat = await ChatService.createChat(meetingId, participants);
        res.status(201).json(chat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/message', async (req, res) => {
    const { meetingId, sender, content } = req.body;

    try {
        const chat = await ChatService.addMessage(meetingId, sender, content);
        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:meetingId', async (req, res) => {
    const { meetingId } = req.params;

    try {
        const chat = await ChatService.getChatHistory(meetingId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
