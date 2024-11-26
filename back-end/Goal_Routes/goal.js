const { Router } = require('express');
const mongoose = require('mongoose');
const Goal = require('../models/Goal');


const app = new Router();

app.get('/goals', async (req, res) => {
    try {
      const goals = await Goal.find().populate('tasks'); // Populate associated tasks
      res.json(goals);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch goals.' });
    }
  });
  

  app.post('/goals/new', async (req, res) => {
    try {
      const { title, tasks, dueDate, priority, description } = req.body;
      const goal = new Goal({ title, tasks, dueDate, priority, description });
      const savedGoal = await goal.save();
      res.status(201).json(savedGoal);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create goal.' });
    }
  });

module.exports = app;