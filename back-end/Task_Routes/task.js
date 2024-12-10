const mongoose = require('mongoose');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); // Import auth middleware
const router = express.Router();

require('../models/schema'); 
const Task = mongoose.model("Task");
const Goal = mongoose.model("Goal");

// Apply authMiddleware to protect all routes
router.use(authMiddleware);

// Fetch urgent tasks for the authenticated user
router.get('/tasks/urgent', async (req, res) => {
    const today = new Date();
    const userId = req.user.userId; // Extract user ID from the token
    today.setHours(0, 0, 0, 0);

    try {
        const urgentTasks = await Task.find({
            user_id: userId,
            due: { $gte: today }
        })
        .sort({ due: 1 })
        .limit(3);
        res.json(urgentTasks);
    } catch (error) {
        console.error('Error fetching urgent tasks:', error);
        res.status(500).json({ error: 'Failed to fetch urgent tasks.' });
    }
});

// Fetch all tasks for the authenticated user
router.get('/tasks', async (req, res) => {
    const userId = req.user.userId; // Extract user ID from the token

    try {
        const tasks = await Task.find({ user_id: userId });
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks.' });
    }
});

// Fetch a single task by its ID
router.get('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }
        res.json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: 'Failed to fetch task.' });
    }
});

// Create a new task for the authenticated user
router.post('/tasks', async (req, res) => {
    const { title, description, subject, due_date, priority, recurring, recurring_period } = req.body;
    const userId = req.user.userId; // Extract user ID from the token
    const due = new Date(due_date);
    const tasksToCreate = [];

    // Helper function to calculate recurring dates
    const nextDue = (currentDate, period) => {
        const dates = [];
        for (let i = 1; i <= 3; i++) {
            const nextDate = new Date(currentDate);
            if (period === 'Weekly') nextDate.setDate(nextDate.getDate() + 7 * i);
            else if (period === 'Biweekly') nextDate.setDate(nextDate.getDate() + 14 * i);
            else if (period === 'Monthly') nextDate.setMonth(nextDate.getMonth() + i);
            dates.push(nextDate);
        }
        return dates;
    };

    try {
        if (recurring === 'Yes') {
            const futureDates = nextDue(due, recurring_period);
            futureDates.forEach(futureDate => {
                tasksToCreate.push({
                    name: title,
                    description,
                    subject,
                    due: futureDate,
                    priority,
                    recurring,
                    recurring_period,
                    status: 'not_started',
                    user_id: userId
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
                user_id: userId
            });
        }

        const savedTasks = await Task.insertMany(tasksToCreate);
        res.status(201).json(savedTasks);
    } catch (error) {
        console.error('Error creating tasks:', error);
        res.status(500).json({ error: 'Failed to create tasks.' });
    }
});

// Update a task's status
router.put('/tasks/:id/status', async (req, res) => {
    const { status } = req.body;

    if (!['not_started', 'ongoing', 'finished'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value.' });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('goal');

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        if (status === 'finished') {
            await Goal.updateOne(
                { _id: updatedTask.goal },
                { $push: { completed_tasks: updatedTask._id } }
            );
        } else if (status === 'not_started' || status === 'ongoing') {
            await Goal.updateOne(
                { _id: updatedTask.goal },
                { $pull: { completed_tasks: updatedTask._id } }
            );
        }

        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ error: 'Failed to update task status.' });
    }
});

// Update a task's details
router.put('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task.' });
    }
});

// Delete a task by ID
router.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        res.status(204).send(); // No content response
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task.' });
    }
});

module.exports = router;
