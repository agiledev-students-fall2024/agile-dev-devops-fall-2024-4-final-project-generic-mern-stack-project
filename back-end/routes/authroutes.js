const express = require('express');
const router = express.Router();

// Hardcoded users for demonstration
const users = [
  { id: 1, username: 'user1', password: 'password123' },
  { id: 2, username: 'user2', password: 'password456' }
];

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.status(200).json({ message: 'Login successful', userId: user.id });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

module.exports = router;
