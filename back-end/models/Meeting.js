// models/Meeting.js
const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    meetingId: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    endedAt: {
        type: Date,
    },
    participants: [{
        type: String  // Participant IDs/names?
    }],
    codeHistory: [{
        code: String,
        language: String,
        timestamp: Date,
        author: String  // Stretch goal: to track who made the changes
    }],
    status: {
        type: String,
        enum: ['active', 'ended'],
        default: 'active'
    }
});

module.exports = mongoose.model('Meeting', meetingSchema);