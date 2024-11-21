const mongoose = require('mongoose');

const LoggedInSchema = new mongoose.Schema({});

const LoggedIn = mongoose.model('LoggedIn', LoggedInSchema);

module.exports = LoggedIn;
