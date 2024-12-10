const { Router } = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middlewares/authMiddleware'); // Import auth middleware
require('../models/goalschema');

const Goal = mongoose.model("Goal");
const Task = mongoose.model("Task");

const app = new Router();

// Apply authMiddleware to protect all routes
app.use(authMiddleware);

// Fetch all goals for the authenticated user
app.get('/goals', async (req, res) => {
    const userId = req.user.userId; // Extract user ID from the token

    try {
        const goals = await Goal.find({ user_id: userId }).populate('tasks');

        // Enrich goals with completed task counts
        const enrichedGoals = goals.map(goal => {
            const completedTasks = goal.tasks.filter(task => task.status === 'finished');
            return {
                ...goal.toObject(),
                completed_tasks: completedTasks,
            };
        });

        res.json(enrichedGoals);
    } catch (error) {
        console.error("Error fetching goals:", error);
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
app.post('/goals/new', async (req, res) => {
    const { title, tasks, dueDate } = req.body;
    const userId = req.user.userId; // Extract user ID from the token

    try {
        // Verify that all referenced tasks exist
        const existingTasks = await Task.find({ _id: { $in: tasks } });
        if (existingTasks.length !== tasks.length) {
            return res.status(400).json({ error: 'Some tasks do not exist.' });
        }

        const goal = new Goal({
            title,
            tasks,
            dueDate,
            completed_tasks: [],
            user_id: userId,
        });

        const savedGoal = await goal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        console.error("Error creating goal:", error);
        res.status(500).json({ error: 'Failed to create goal.' });
    }
});

module.exports = app;
