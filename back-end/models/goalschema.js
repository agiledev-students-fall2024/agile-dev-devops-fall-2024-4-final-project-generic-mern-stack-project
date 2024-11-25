const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
    trim: true, 
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task', 
    },
  ],
  dueDate: {
    type: Date,
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed'], 
    default: 'not_started',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'], 
    default: 'medium',
  },
  description: {
    type: String,
    required: false, 
    trim: true,
  },
});

GoalSchema.pre('save', function (next) {
  this.updatedAt = Date.now(); 
  next();
});

const Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;
