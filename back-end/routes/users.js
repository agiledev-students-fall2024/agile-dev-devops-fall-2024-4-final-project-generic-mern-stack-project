import express from 'express';
import fs from 'fs';

const router = express.Router();
const users = JSON.parse(fs.readFileSync('./mock-data/users.json', 'utf-8'));

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get a specific user by ID
router.get('/:userId', (req, res) => {
  const user = users.find(u => u.id === req.params.userId);
  res.json(user || { error: 'User not found' });
});

// Get trips associated with a user
router.get('/:userId/trips', (req, res) => {
  const userTrips = trips.filter(trip => trip.participants.includes(req.params.userId));
  res.json(userTrips);
});

// Create a new user
router.post('/', (req, res) => {
  const newUser = { ...req.body, id: `user_${Date.now()}` };
  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;
