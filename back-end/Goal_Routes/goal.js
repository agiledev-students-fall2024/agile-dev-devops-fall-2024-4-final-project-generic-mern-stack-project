const { Router } = require('express');
const mongoose = require('mongoose');
require('../models/goalschema');
const Goal = mongoose.model("Goal")
const Task = mongoose.model('Task');


const app = new Router();

app.get('/goals/:id', async (req, res) => {
    const userId = req.params.id;
    console.log("userId", userId)
    try {
      const goals = await Goal.find({"user_id": userId}).populate('tasks');
      console.log("goals", goals) 
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
      res.status(500).json([]);
    }
  });
  

app.post('/goals/new', async (req, res) => {
    try {
        const { title, tasks, dueDate, user_id } = req.body;

        const existingTasks = await Task.find({ _id: { $in: tasks } });
        if (existingTasks.length !== tasks.length) {
            return res.status(400).json({ error: 'Some tasks do not exist.' });
        }

        const goal = new Goal({
            title,
            tasks,
            dueDate,
            completed_tasks: [],
            user_id
        });

        const savedGoal = await goal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create goal.' });
    }
});



module.exports = app;