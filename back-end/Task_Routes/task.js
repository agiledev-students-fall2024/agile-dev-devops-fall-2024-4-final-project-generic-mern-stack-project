const mongoose = require('mongoose');
const express = require('express');
const { resource } = require('../app');
const router = express.Router();
/* The line `require('../models/schema');` is importing the schema definition for tasks from a file
located at '../models/schema.js' or a similar path. This schema likely defines the structure of the
Task model used in the application, including the fields like name, description, subject, due date,
priority, recurring, recurring period, and status. This schema is necessary for defining how tasks
are structured and stored in the database using Mongoose, which is a MongoDB object modeling tool
for Node.js. */
require('../models/schema'); 
const Task = mongoose.model("Task")

router.get('/tasks/urgent', async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  Task.find({ due: { $gte: today } }) 
    .sort({ due: 1 }) 
    .limit(3) 
    .then(urgentTasks => res.json(urgentTasks));
});

router.get('/tasks', (req, res) => {
  Task.find().then(tasks => {
    tasks.forEach(task => {
    });
    res.json(tasks);
  });
});


// Get task by ID
router.get('/tasks/:id', (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    });
});

// router.post('/tasks', async (req, res) => {
//   const { name, description, subject, due, priority, recurring, recurring_period} = req.body;
//   const status = "not_started"
//   console.log(req.body)
//   const dueDate = new Date(due)
//   const newTask = new Task({name, description, subject, due:dueDate, priority, recurring, recurring_period, status })
//   const task1 = await newTask.save()
//   // const newTask = { name, due, status, priority, subject, recurring_period };
//   res.status(201).json(task1);
// });
router.post('/tasks', async (req, res) => {
  const { title, description, subject, due_date, priority, recurring, recurring_period } = req.body;
  const status = "not_started";
  const dueDate = new Date(due_date);
  // Create a new task
  const newTask = new Task({
    name: title,
    description,
    subject,
    due: dueDate, // Use the validated Date object
    priority,
    recurring,
    recurring_period,
    status,
  });
  // Save the task to the database and respond
  const task1 = await newTask.save();
  res.status(201).json(task1);
});


router.put('/tasks/:id/status', (req, res) => {
  const { status } = req.body;

  // Validate input
  if (!["not_started", "ongoing", "finished"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  Task.findByIdAndUpdate(req.params.id, { status }, { new: true })
    .then(updatedTask => {
      if (updatedTask) {
        res.json(updatedTask);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});



router.get('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

// Update a specific task by MongoDB ID
router.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const updatedTaskData = req.body;

  const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true });
  if (!updatedTask) {
    return res.status(404).json({ error: "Task not found or could not be updated" });
  }
  res.json(updatedTask);
});

// Delete a task by MongoDB ID
router.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const deletedTask = await Task.findByIdAndDelete(taskId);
  if (!deletedTask) {
    return res.status(404).json({ error: "Task not found or could not be deleted" });
  }
  res.json({ message: "Task deleted successfully" });
});
router.get('/tasks/due/:date', async (req, res) => {
  const tasks = await fetch('https://my.api.mockaroo.com/tasks?key=34c59640');
  const tasksDue = tasks.filter(task => task.due === req.params.date);
  res.json(tasksDue);
});

router.get('/tasks/recurring/:period', async (req, res) => {
  const tasks = await fetch('https://my.api.mockaroo.com/tasks?key=34c59640');
  const recurringTasks = tasks.filter(task => task.recurring_period === req.params.period);
  res.json(recurringTasks);
});
router.get('/tasks/subjects', async (req, res) => {
  const response = await fetch('https://my.api.mockaroo.com/tasks?key=34c59640');
  const tasks = await response.json();
  const subjects = [...new Set(tasks.map(task => task.subject))];
  res.json(subjects);
});
module.exports = router;