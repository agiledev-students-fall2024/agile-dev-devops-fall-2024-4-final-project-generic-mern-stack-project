const mongoose = require('mongoose');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); // Import the auth middleware
const router = express.Router();

require('../models/schema'); 
const Task = mongoose.model("Task");

// Apply authMiddleware to protect all routes
router.use(authMiddleware);

// Fetch task counts for each day in the current month
router.get('/calendar/month/:year/:month/tasks', async (req, res) => {
    const { year, month } = req.params;
    const userId = req.user.userId; // Extract user ID from the token

    try {
        const startOfMonth = new Date(Date.UTC(year, month - 1, 1));
        const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59));

        const tasks = await Task.find({
            due: { $gte: startOfMonth, $lte: endOfMonth },
            user_id: userId
        });

        const daysInMonth = new Date(year, month, 0).getDate();
        const dailyTaskCounts = Array.from({ length: daysInMonth }, (_, i) => ({
            day: i + 1,
            count: 0,
        }));

        tasks.forEach(task => {
            const taskDay = new Date(task.due).getUTCDate();
            dailyTaskCounts[taskDay - 1].count += 1;
        });

        res.json(dailyTaskCounts);
    } catch (error) {
        console.error("Error fetching monthly tasks:", error);
        res.status(500).json({ error: "Failed to fetch monthly task counts." });
    }
});

// Fetch tasks for a specific day
router.get('/calendar/:month/:day/:year', async (req, res) => {
    const { month, day, year } = req.params;
    const userId = req.user.userId; // Extract user ID from the token

    try {
        const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)); // Midnight UTC
        const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59)); // 23:59:59 UTC

        const tasks = await Task.find({
            due: { $gte: startOfDay, $lte: endOfDay },
            user_id: userId
        });

        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks for the day:", error);
        res.status(500).json({ error: "Failed to fetch tasks for the day." });
    }
});

module.exports = router;
