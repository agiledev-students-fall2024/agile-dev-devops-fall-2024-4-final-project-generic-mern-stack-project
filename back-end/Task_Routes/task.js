const mongoose = require('mongoose');
const express = require('express');
const { resource } = require('../app');
const router = express.Router();

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



router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id) 
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.json(task)
} catch (error) {
    res.status(500).json({ error: error.message })
}
});



router.post('/tasks', async (req, res) => {
  const { title, description, subject, due_date, priority, recurring, recurring_period} = req.body;
  const due = new Date(due_date);
  const tasksToCreate = [];

  const nextDue = (currentDate, period) => {
    const dates = [];
    for (let i = 1; i <= 3; i++) {
      const nextDate = new Date(currentDate);
      if (period === 'Weekly') nextDate.setDate(nextDate.getDate() + 7 * i);
      else if (period === 'Biweekly') nextDate.setDate(nextDate.getDate() + 14 + i);
      else if (period === 'Monthly') nextDate.setMonth(nextDate.getMonth() + i);
      dates.push(nextDate);
    }
    return dates;
  };
  try {
    if (recurring) {
      const futureDates = nextDue(due, recurring_period);

      futureDates.forEach((futureDate) => {
        tasksToCreate.push({
          name: title,
          description,
          subject,
          due: futureDate,
          priority,
          recurring,
          recurring_period,
          status: 'not_started',
        });
      });
    } else {
      tasksToCreate.push({
        name: title,
        description,
        subject,
        due: initialDue,
        priority,
        recurring: false,
        recurring_period: null,
        status: 'not_started',
      });
    }

    const savedTasks = await Task.insertMany(tasksToCreate);
    res.status(201).json(savedTasks);
  } catch (error) {
    console.error("Error creating tasks:", error.message);
    res.status(500).json({ error: error.message });
  }
});


router.put('/tasks/:id/status', (req, res) => {
  const { status } = req.body;

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


router.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' })
    }
    res.json(updatedTask)
} catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message })
}
});

router.delete('/tasks/:id', async (req, res) => {
  try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id)
      if (!deletedTask) {
          return res.status(404).json({ message: 'Task not found' })
      }
      res.status(204).send() // No content response
  } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error: error.message })
  }
})
module.exports = router;