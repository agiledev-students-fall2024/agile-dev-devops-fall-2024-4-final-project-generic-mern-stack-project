const express = require('express');
const { resource } = require('../app');
const router = express.Router();
// const Task = require('./models/Task'); 

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
  
  // const filterTasks = (tasks, { status, priority, subject }) => {
  //   return tasks.filter(task => {
  //     return (!status || task.status === status) &&
  //            (!priority || task.priority === priority) &&
  //            (!subject || task.subject === subject);
  //   });
  // };
  // const filteredTasks = filterTasks(tasks, { status, priority, subject });
  res.json(tasks);
});

router.get('/tasks/:id', async (req, res) => {
  const tasks = await fetch('https://my.api.mockaroo.com/tasks?key=34c59640');
  const task = tasks.find(t => t.id.$oid === req.params.id);
  res.json(task);
});

router.post('/tasks', async (req, res) => {
  const { name, due, status, priority, subject, recurring_period } = req.body;
  const newTask = { name, due, status, priority, subject, recurring_period };
  res.status(201).json(newTask);
});


//Edit task
router.put('/tasks/:id', async (req, res) => {
  const updatedTask = { ...req.body, id: req.params.id };

  // Where to save the updatedTask to a database.
  res.json(updatedTask);
});


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


router.delete('/tasks/:id', async (req, res) => {
  res.status(204).send(); // Mock now cause no way to store task ID
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