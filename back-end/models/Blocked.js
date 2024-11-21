const mongoose = require('mongoose');

const blockedSchema = new mongoose.Schema({});

const Blocked = mongoose.model('Blocked', blockedSchema);

module.exports = Blocked;