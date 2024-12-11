const { Router } = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middlewares/authMiddleware');
require('../models/schema');

const Goal = mongoose.model('Goal');
const Task = mongoose.model('Task');

const app = new Router();

// Apply authMiddleware to protect all routes
app.use(authMiddleware);

// Fetch all goals for the authenticated user
app.get('/', async (req, res) => {
    const userId = req.user.userId; // Extract user ID from JWT
    console.log(userId);

    try {
        //const goals = await Goal.find({ user_id: userId }).populate('tasks');
        const goals = await Goal.find({ user_id: userId }).populate('tasks');
        // Enrich goals with completed task counts
        // const enrichedGoals = goals.map(goal => ({
        //     ...goal.toObject(),
        //     completed_tasks: goal.tasks.filter(task => task.status === 'finished'),
        // }));

        res.status(200).json(goals);
    } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ error: 'Failed to fetch goals.' });
    }
});

// Delete a goal by its ID
app.delete('/delete/goals/:id', async (req, res) => {
    const goalId = req.params.id;

    try {
        const goal = await Goal.findByIdAndDelete(goalId);

        if (!goal) {
            return res.status(404).json({ error: 'Goal not found.' });
        }

        res.json(goal);
    } catch (error) {
        console.error("Error deleting goal:", error);
        res.status(500).json({ error: 'Failed to delete goal.' });
    }
});

// Create a new goal for the authenticated user
app.post('/new', async (req, res) => {
    try {
        const { title, tasks, dueDate} = req.body;
        user_id = req.user.userId;
        console.log(req.body)
        // Log the incoming data
        console.log("Incoming Data:", { title, tasks, dueDate, user_id });

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

        // Log the saved goal
        console.log("Saved Goal:", savedGoal);

        res.status(201).json(savedGoal);
    } catch (error) {
        console.error("Error saving goal:", error);
        res.status(500).json({ error: 'Failed to create goal.' });
    }
});

module.exports = app;
