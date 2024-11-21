const mongoose = require('mongoose');

const blockedSchema = new mongoose.Schema({
  blocker_id: {
    type: String, // Assuming IDs are strings (e.g., user IDs)
    required: true,
  },
  blocked_id: {
      type: String, // Assuming IDs are strings
      required: true,
  },
  created_at: {
      type: Date,
      default: Date.now, // Automatically set the creation timestamp
  },
});

const Blocked = mongoose.model('Blocked', blockedSchema);

module.exports = Blocked;
