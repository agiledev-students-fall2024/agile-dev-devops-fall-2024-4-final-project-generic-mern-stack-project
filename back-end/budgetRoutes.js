const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as needed

// Create a new user
router.post('/users', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const newUser = new User({ username, password, email, monthlyRecaps: [] });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

module.exports = router;

