// routes/users.js
import express from 'express';
import users from '../data/users.json' assert { type: 'json' };

const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET user by ID
router.get('/:userId', (req, res) => {
  const user = users.find(u => u.id === req.params.userId);
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
});

export default router;
