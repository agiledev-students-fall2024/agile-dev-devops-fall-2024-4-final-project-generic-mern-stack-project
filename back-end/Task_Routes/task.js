const mongoose = require('mongoose');
const express = require('express');
const { resource } = require('../app');
const router = express.Router();
require('../models/schema'); 
const Task = mongoose.model("Task")

router.get('/tasks/urgent', async (req, res) => {
  const response = await fetch('https://my.api.mockaroo.com/tasks?key=34c59640');
  let tasks = await response.json()
  const urgentTasks = await tasks
    .sort((a, b) => new Date(a.due) - new Date(b.due))
    .slice(0, 3);
  res.json(urgentTasks);
});

router.get('/tasks', async (req, res) => {
  let tasks = await fetch('https://my.api.mockaroo.com/tasks?key=34c59640');
  tasks = await tasks.json();

  res.json(tasks);
});
// Id related
router.get('/tasks/:id', async (req, res) => {
  const tasks = await fetch('https://my.api.mockaroo.com/tasks?key=34c59640');
  const task = tasks.find(t => t.id.$oid === req.params.id);
  res.json(task);
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
  try {
    const { title, description, subject, due_date, priority, recurring, recurring_period } = req.body;

    // Validate required fields

    if (!title || !subject || !priority || !recurring) {
      console.log(subject,priority,recurring)
      // return res.status(400).json({ error: "Missing required fields." });
    }
    // Validate and convert the 'due' field to a Date object
    console.log(due_date)
    const dueDate = new Date(due_date);
    console.log(dueDate)
    if (isNaN(dueDate)) {
      console.log("f")
      // return res.status(400).json({ error: "Invalid date format for 'due'." });
    }

    // Default status
    const status = "not_started";

    // Create a new task
    const newTask = new Task({
      "name":title,
      description,
      subject,
      due: dueDate, // Use the validated Date object
      priority,
      recurring,
      recurring_period,
      status
    });

    // Save the task to the database
    const task1 = await newTask.save();

    res.status(201).json(task1);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create the task." });
  }
});



router.put('/tasks/:id', async (req, res) => {
  const updatedTask = { ...req.body, id: req.params.id };
  res.json(updatedTask);
});

//Cannot really test without a task id
router.put('/tasks/:id/status', async (req, res) => {
  const { status } = req.body;
  const taskId = req.params.id;

  const tasks = await fetch('https://my.api.mockaroo.com/tasks?key=34c59640');
  const taskList = await tasks.json();
  const task = taskList.find(t => t.id.$oid === taskId);
  if (task) {
    task.status = status;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});



// Comment for Sprint2: all those are prepared waiting for integrating database.

router.delete('/tasks/:id', async (req, res) => {
  res.status(204).send(); // Mock now cause no way to store task ID
});
// router.get('/tasks/due/:date', async (req, res) => {
//   const tasks = await fetch('https://my.api.mockaroo.com/tasks?key=34c59640');
//   const tasksDue = tasks.filter(task => task.due === req.params.date);
//   res.json(tasksDue);
// });

// router.get('/tasks/recurring/:period', async (req, res) => {
//   const tasks = await fetch('https://my.api.mockaroo.com/tasks?key=34c59640');
//   const recurringTasks = tasks.filter(task => task.recurring_period === req.params.period);
//   res.json(recurringTasks);
// });
// router.get('/tasks/subjects', async (req, res) => {
//   const response = await fetch('https://my.api.mockaroo.com/tasks?key=34c59640');
//   const tasks = await response.json();
//   const subjects = [...new Set(tasks.map(task => task.subject))];
//   res.json(subjects);
// });
module.exports = router;