const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;