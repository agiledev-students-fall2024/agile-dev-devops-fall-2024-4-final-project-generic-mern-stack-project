import express from 'express';
import * as tripsController from '../controllers/tripsController.js';
import fs from 'fs';

const router = express.Router();
const trips = JSON.parse(fs.readFileSync('./mock-data/trips.json', 'utf-8'));
const locations = JSON.parse(fs.readFileSync('./mock-data/locations.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync('./mock-data/users.json', 'utf-8'));

// Get all trips (GET) - Retrieve and respond with a list of all trips in the system
router.get('/', tripsController.getAllTrips);

// Get a specific trip by ID (GET) - Retrieve details for the specified trip, including associated locations and participants
router.get('/:tripId', tripsController.getTripById);

// Get Trip info (locations) for a specific trip by tripId
router.get('/:tripId/locations', tripsController.getTripLocations);

// TODO: Create a new trip (POST) - Add a new trip to the system and respond with the newly created trip data
//no error handling yet because errors will happen if the database interaction doesn't work,
//which we haven't implemented
router.post('/', (req, res)=>{
  const newTrip = {
    ...req.body,
    id: `trip_${Date.now()}`,
    status: 'upcoming'
  };
  //console.log(newTrip);
  res.status(201).json(newTrip);
});

// Join a Trip (POST) - Check if trip exists and add to user's and trip's data if valid
router.post('/:tripId/join', (req, res) => {
  const tripId = req.params.tripId;
  const { userId } = req.body;

  // Find the trip and user
  const trip = trips.find(t => t.id === tripId);
  const user = users.find(u => u.id === userId);

  // Handle missing trip or user
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  if (!user) return res.status(404).json({ error: 'User not found' });

  // Check if user is already a participant in the trip
  if (trip.participants.includes(userId)) {
    return res.status(400).json({ error: 'You are already a participant in this trip.' });
  }

  // Add user to the trip's participants
  trip.participants.push(userId);

  // Add trip to the user's trips
  user.trips.push(tripId);

  // Save updated data back to the mock JSON files
  fs.writeFileSync('./mock-data/trips.json', JSON.stringify(trips, null, 2), 'utf-8');
  fs.writeFileSync('./mock-data/users.json', JSON.stringify(users, null, 2), 'utf-8');

  res.status(200).json({ message: 'Successfully joined the trip', trip });
});

//TODO: change trip status, should be a PUT request
// Update trip status by Trip ID (PUT)
router.put('/:tripId/status', (req, res) => {
  const { tripId } = req.params;
  const { status } = req.body;

  // Find the trip
  const trip = trips.find(t => t.id === tripId);

  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  // Update the status
  trip.status = status;

  // Save the updated data to the JSON file
  fs.writeFileSync('./mock-data/trips.json', JSON.stringify(trips, null, 2), 'utf-8');

  res.status(200).json({ message: 'Trip status updated successfully', trip });
});


//Stretch Goal Routes
// TODO: Update trip information (PUT) - Modify trip data and respond with the updated information
// TODO: Delete a trip (DELETE) - Remove the specified trip and respond with a confirmation message

export default router;
