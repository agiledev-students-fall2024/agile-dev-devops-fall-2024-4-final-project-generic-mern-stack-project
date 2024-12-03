const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    id: {
        type: UUID,
        unique: true,
        required: true,
        default: () => randomUUID()
    },
    participants: {
        type: Array,
        required: false
    },
    messages: {
        type: [messageSchema],
        required: true,

    },
});

// Define the sub-schema for messages
const messageSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Meeting', meetingSchema);
