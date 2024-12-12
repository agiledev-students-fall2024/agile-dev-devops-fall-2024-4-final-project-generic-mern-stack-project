const mongoose = require('mongoose');
const express = require('express');
const { resource } = require('../app');
const router = express.Router();
const sanitize = require('mongo-sanitize');
/* The line `require('../models/schema');` is importing the schema definition for tasks from a file
located at '../models/schema.js' or a similar path. This schema likely defines the structure of the
Task model used in the application, including the fields like name, description, subject, due date,
priority, recurring, recurring period, and status. This schema is necessary for defining how tasks
are structured and stored in the database using Mongoose, which is a MongoDB object modeling tool
for Node.js. */
require('../models/schema'); 
const Task = mongoose.model("Task")
const Goal = mongoose.model("Goal")

router.get('/tasks/urgent/:id', async (req, res) => {
  const today = new Date();
  let userId = req.params.id;
  userId = sanitize(userId);
  today.setHours(0, 0, 0, 0);
  const urgentTasks = await Task.find({ 
    user_id: userId, 
    due: { $gte: today } 
  })
  .sort({ due: 1 }) 
  .limit(3);
  res.json(urgentTasks);
});

router.get('/tasks', (req, res) => {
  Task.find().then(tasks => {
    tasks.forEach(task => {
    });
    res.json(tasks);
  });
});



router.get('/task/:id', async (req, res) => {
  try {
    const task = await Task.find({"user_id": req.params.id}) 
    if (!task) {
        return res.json([])
    }
    else {
        res.json(task)
    }
} catch (error) {
    res.status(500).json({ error: error.message })
}
});



router.post('/tasks', async (req, res) => {
  let { title, description, subject, due_date, priority, recurring, recurring_period, user_id} = req.body;
  title = sanitize(title);
  description = sanitize(description);
  subject = sanitize(subject);
  due_date = sanitize(due_date);
  priority = sanitize(priority); 
  recurring = sanitize(recurring);
  recurring_period = sanitize(recurring_period);
  user_id = sanitize(user_id);
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
    if (recurring === "Yes") {
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
          user_id,
        });
      });
    } else {
      tasksToCreate.push({
        name: title,
        description,
        subject,
        due,
        priority,
        recurring: false,
        recurring_period: null,
        status: 'not_started',
        user_id,
      });
    }

    const savedTasks = await Task.insertMany(tasksToCreate);
    res.status(201).json(savedTasks);
  } catch (error) {
    console.error("Error creating tasks:", error.message);
    res.status(500).json({ error: error.message });
  }
});


router.put('/tasks/:id/status', async (req, res) => {
  let { status } = req.body;

  status = sanitize(status);

  if (!["not_started", "ongoing", "finished"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('goal');
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    else {
        if (status === 'finished') {
            await Goal.updateOne({ _id: updatedTask.goal }, { $push: { completed_tasks: updatedTask._id } });              
        }
        else if (status == "ongoing" || status == "not_started") {
            await Goal.updateOne({ _id: updatedTask.goal }, { $pull: { completed_tasks: updatedTask._id } });
        }
        res.json(updatedTask);
    }
  } catch (error) {
        res.status(500).json({ error })
  }
});



router.get('/tasks/:id', async (req, res) => {
  let taskId = req.params.id;
  taskId = sanitize(taskId);
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});


router.put('/tasks/:id', async (req, res) => {
    let { name, description, subject, due, priority, recurring, recurring_period} = req.body;
    name = sanitize(name);
    description = sanitize(description);
    subject = sanitize(subject);
    due = sanitize(due);
    priority = sanitize(priority); 
    recurring = sanitize(recurring);
    recurring_period = sanitize(recurring_period);
  try {
    const updatedTaskData = {
        name,
        due,
        description,
        priority,
        subject,
        recurring,
        recurring_period: recurring === "Yes" ? recurring_period : "",
    }
    const updatedTask = await Task.findByIdAndUpdate(sanitize(req.params.id), updatedTaskData, { new: true, runValidators: true })
    const goal = await Goal.findOne({ tasks: req.params.id });
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