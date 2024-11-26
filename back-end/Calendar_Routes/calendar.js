const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
require('../models/schema'); 
const Task = mongoose.model("Task")

router.get('/calendar/month/:year/:month/tasks', async (req, res) => {
  const { year, month } = req.params;
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0); 

  try {
    const taskCounts = await Task.aggregate([
      {
        $match: {
          due: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      {
        $group: {
          _id: { $dayOfMonth: "$due" },
          count: { $sum: 1 } 
        }
      },
      {
        $project: {
          day: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    const daysInMonth = new Date(year, month, 0).getDate();
    const dailyTaskCounts = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const taskForDay = taskCounts.find(task => task.day === day);
      return {
        day,
        count: taskForDay ? taskForDay.count : 0
      };
    });

    res.json(dailyTaskCounts);
  } catch (error) {
    console.error("Error fetching task counts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/calendar/:month/:day/:year', async (req, res) => {
  const { month, day, year } = req.params;

  try {
    const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)); // Midnight UTC
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59)); // 23:59:59 UTC
    const tasks = await Task.find({
      due: { $gte: startOfDay, $lte: endOfDay }
    });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks for the day:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;