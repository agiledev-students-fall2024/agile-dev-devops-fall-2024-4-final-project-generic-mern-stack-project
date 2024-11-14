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

// Get Trip info (locations) for a specific trip by tripId
router.get('/:tripId/locations', (req, res) => {
    const tripId = req.params.tripId;
    const tripLocations = locations.filter(location => location.tripId === tripId);
  
    if (tripLocations.length > 0) {
      res.json(tripLocations);
    } else {
      res.status(404).json({ error: 'No locations found for this trip' });
    }
  });

// TODO: Create a new trip (POST) - Add a new trip to the system and respond with the newly created trip data
//no error handling yet because errors will happen if the database interaction doesn't work,
//which we haven't implemented
router.post('/', (req, res)=>{
  const newTrip = {
    ...req.body,
    id: `trip_${Date.now()}`
  };
  //console.log(newTrip);
  res.status(201).json(newTrip);
});


// TODO: Update trip information (PUT) - Modify trip data and respond with the updated information


// TODO: Delete a trip (DELETE) - Remove the specified trip and respond with a confirmation message


export default router;
