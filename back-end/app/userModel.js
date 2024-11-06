const mongoose = require('mongoose')

const OTPSChema = new mongoose.schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    }

})

module.exports = mongoose.model('User', schema)