const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String
  }],
  author: {
    // type: mongoose.Schema.Types.ObjectId, for sprint 3s
    type: String,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  attachments: [{
    fileId: {
      type: String,
      default: () => require('uuid').v4(),
      required: true
    },
    fileName: {
      type: String,
      required: true,
      trim: true
    },
    fileType: {
      type: String,
      required: true,
      trim: true
    },
    fileSize: {
      type: Number,
      required: true
    }
  }]
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;