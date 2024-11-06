import express from 'express';
import fs from 'fs';

const router = express.Router();
const users = JSON.parse(fs.readFileSync('./mock-data/users.json', 'utf-8'));
const trips = JSON.parse(fs.readFileSync('./mock-data/trips.json', 'utf-8'));

// Get all users (GET) - Retrieve and respond with a list of all users, including basic details only
router.get('/', (req, res) => {
  res.json(users);
});

// Get a specific user by ID (GET) - Retrieve details for the specified user, including their associated trips
router.get('/:userId', (req, res) => {
  const user = users.find(u => u.id === req.params.userId);
  if (user) {
    const userTrips = trips.filter(trip => trip.participants.includes(user.id));
    res.json({ ...user, trips: userTrips });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// TODO: Get trips associated with a user (GET) - Retrieve and respond with a list of trips for a specific user by userId


// TODO: Create a new user (POST) - Add a new user to the system and respond with the newly created user data


// TODO: Update user information (PUT) - Modify the specified user's data and respond with updated info


// TODO: Delete a user (DELETE) - Remove the specified user and respond with a confirmation message


export default router;
