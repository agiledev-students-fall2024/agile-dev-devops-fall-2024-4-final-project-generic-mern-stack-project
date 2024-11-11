const express = require('express');
const router = express.Router();

// Temporary in-memory user store
const users = [
  { id: 1, username: 'user1', email: 'user1@example.com', password: 'password123' },
  { id: 2, username: 'user2', email: 'user2@example.com', password: 'password456' }
];

// Register route
router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // Check if username or email already exists
  const existingUser = users.find(u => u.username === username || u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Username or email already exists' });
  }


  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);

  res.status(201).json({ message: 'Registration successful', userId: newUser.id });
});

module.exports = router;
