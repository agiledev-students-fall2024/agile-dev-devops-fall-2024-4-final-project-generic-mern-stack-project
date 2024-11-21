const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  user_id_1: {
    type: String, // Assuming user IDs are strings
    required: true,
  },
  user_id_2: {
      type: String, // Assuming user IDs are strings
      required: true,
  },
  created_at: {
      type: Date,
      default: Date.now, // Automatically set the creation timestamp
  },

});


const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
