const { Router } = require('express');
const mongoose = require('mongoose');
require('../models/goalschema');
require('../models/schema'); // Ensure Task schema is registered
const Goal = mongoose.model("Goal");
const Task = mongoose.model("Task");

const app = new Router();

// Get all goals for the logged-in user
app.get('/goals', async (req, res) => {
    const userId = req.user._id;
    try {
        const goals = await Goal.find({ user_id: userId }).populate('tasks');
        const enrichedGoals = goals.map(goal => {
            const completedTasks = goal.tasks.filter(task => task.status === 'finished');
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

// Create a new goal
app.post('/goals/new', async (req, res) => {
    const userId = req.user._id;
    const { title, tasks, dueDate } = req.body;

    if (new Date(dueDate) <= new Date()) {
        return res.status(400).json({ error: 'dueDate must be in the future.' });
    }

    try {
        const existingTasks = await Task.find({ _id: { $in: tasks } });
        if (existingTasks.length !== tasks.length) {
            return res.status(400).json({ error: 'Some tasks do not exist.' });
        }

        const goal = new Goal({
            title,
            tasks,
            dueDate,
            user_id: userId,
            completed_tasks: [],
        });

        const savedGoal = await goal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create goal.' });
    }
});

module.exports = app;
