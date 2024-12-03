const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  title: {type: String,required: true,},
  tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task',},],
  dueDate: {type: Date, required: true,},
  completed_tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task',},],});

mongoose.model('Goal', GoalSchema);
