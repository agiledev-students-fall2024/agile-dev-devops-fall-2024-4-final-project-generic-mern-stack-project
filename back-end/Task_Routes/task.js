const express = require('express');
const router = express.Router();
const Task = require('./models/Task'); // Assuming Task is a Mongoose model


router.get('/tasks', async (req, res) => {
  const { status, priority, subject } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (subject) filter.subject = subject;

  const tasks = await Task.find(filter);
  res.json(tasks);
});

router.get('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

router.post('/tasks', async (req, res) => {
  const { name, due, status, priority, subject, recurring_period } = req.body;
  
  const newTask = new Task({
    name,
    due,
    status,
    priority,
    subject,
    recurring_period
  });

  const savedTask = await newTask.save();
  res.status(201).json(savedTask);
});

// Update an existing task by ID
router.put('/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // Returns the updated document
  );
  res.json(updatedTask);
});

router.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send(); // No content response
});


router.get('/tasks/due/:date', async (req, res) => {
  const tasks = await Task.find({ due: req.params.date });
  res.json(tasks);
});

router.get('/tasks/recurring/:period', async (req, res) => {
  const tasks = await Task.find({ recurring_period: req.params.period });
  res.json(tasks);
});

module.exports = router;