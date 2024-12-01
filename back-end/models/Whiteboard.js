const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const whiteboardSchema = new mongoose.Schema({
    id: {
        type: UUID,
        unique: true,
        required: true,
        default: () => randomUUID()
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
});

module.exports = mongoose.model('Whiteboard', whiteboardSchema);