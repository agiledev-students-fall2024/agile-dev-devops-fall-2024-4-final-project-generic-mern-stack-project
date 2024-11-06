import express from 'express';
import fs from 'fs';

const router = express.Router();
const trips = JSON.parse(fs.readFileSync('./mock-data/trips.json', 'utf-8'));
const locations = JSON.parse(fs.readFileSync('./mock-data/locations.json', 'utf-8'));

// Get all trips (GET) - Retrieve and respond with a list of all trips in the system
router.get('/', (req, res) => {
  res.json(trips);
});

// Get a specific trip by ID (GET) - Retrieve details for the specified trip, including associated locations and participants
router.get('/:tripId', (req, res) => {
  const trip = trips.find(t => t.id === req.params.tripId);
  if (trip) {
    const tripLocations = locations.filter(location => location.tripId === trip.id);
    res.json({ ...trip, locations: tripLocations });
  } else {
    res.status(404).json({ error: 'Trip not found' });
  }
});

// TODO: Create a new trip (POST) - Add a new trip to the system and respond with the newly created trip data


// TODO: Update trip information (PUT) - Modify trip data and respond with the updated information


// TODO: Delete a trip (DELETE) - Remove the specified trip and respond with a confirmation message


export default router;
