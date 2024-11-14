const express = require('express');
const router = express.Router();

// Temporary in-memory user store (for demonstration purposes)
const users = [
  { id: 1, username: 'user1', email: 'user1@example.com', password: 'password123' },
  { id: 2, username: 'user2', email: 'user2@example.com', password: 'password456' }
];

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate presence of username and password
  if (!username) return res.status(400).json({ error: 'Username is required' });
  if (!password) return res.status(400).json({ error: 'Password is required' });

  // Find the user with the matching username and password
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // If the user is found, return a success response
    res.status(200).json({ message: 'Login successful' });
  } else {
    // If no match is found, return an error response
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Register route
router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Validate presence of required fields
  if (!username) return res.status(400).json({ error: 'Username is required' });
  if (!email) return res.status(400).json({ error: 'Email is required' });
  if (!password) return res.status(400).json({ error: 'Password is required' });
  if (!confirmPassword) return res.status(400).json({ error: 'Confirm password is required' });

  // Validate that passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // Check if the username or email already exists in the users array
  const existingUser = users.find(u => u.username === username || u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Username or email already exists' });
  }

  // Create a new user and add to the in-memory users array
  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);

  // Respond with success message
  res.status(201).json({ message: 'Registration successful', userId: newUser.id });
});

module.exports = router;
