const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // reference the user schema
        required: false,
    },
    message: {
        type: String,
        required: true,
    },
    location: {
        type: [Number], // [lat, lng]
        required: true,
        validate: {
            validator: function (v) {
                return v.length === 2; 
            },
            message: 'Location must be an array of two numbers [latitude, longitude].',
        },
    },
}, { timestamps: true });

const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;
