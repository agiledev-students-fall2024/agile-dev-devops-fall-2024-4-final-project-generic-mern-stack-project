const { Router } = require('express');
const mongoose = require('mongoose');
require('../models/goalschema');
const Goal = mongoose.model("Goal")


const app = new Router();

app.get('/goals', async (req, res) => {
    try {
      const goals = await Goal.find().populate('tasks'); 
      const enrichedGoals = goals.map(goal => {
        const completedTasks = goal.tasks.filter(task => task.status === 'finished');
        console.log("taskscomplete", completedTasks)
        return {
            ...goal.toObject(),
            completed_tasks: completedTasks,
        };
    });
      res.json(enrichedGoals);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch goals.' });
    }
  });

  const Task = mongoose.model('Task');

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks.' });
    }
});
  

app.post('/goals/new', async (req, res) => {
    try {
        const { title, tasks, dueDate } = req.body;

        const existingTasks = await Task.find({ _id: { $in: tasks } });
        if (existingTasks.length !== tasks.length) {
            return res.status(400).json({ error: 'Some tasks do not exist.' });
        }

        const goal = new Goal({
            title,
            tasks,
            dueDate,
            completed_tasks: [],
        });

        const savedGoal = await goal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create goal.' });
    }
});



module.exports = app;