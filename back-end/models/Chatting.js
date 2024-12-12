/**
 * Chat Model
 * This file defines the Mongoose schema and model for chat functionality.
 * Each chat is tied to a specific meeting, contains participants, and stores messages.
 * Messages include the sender, content, and timestamp.
 */
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    meetingId: {
        type: String,
        required: true,
    },
    participants: [{
        type: String,
    }],
    messages: [{
        sender: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Chat', chatSchema);
