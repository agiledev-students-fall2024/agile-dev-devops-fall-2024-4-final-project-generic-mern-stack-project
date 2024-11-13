import express from 'express';
import fs from 'fs';

const router = express.Router();
const locations = JSON.parse(fs.readFileSync('./mock-data/locations.json', 'utf-8'));

// TODO: Get all locations (GET) - Retrieve and respond with a list of all locations, including basic details
router.get('/', (req, res) => {
    res.json(locations);
  });

router.get('/:locationId', (req, res) => {
  const locationId = req.params.locationId;
  const location = locations.find(loc => loc.id === locationId);

  if (location) {
    res.json(location);
  } else {
    res.status(404).json({ error: 'Location not found' });
  }
});
  

// Get locations by Trip ID (GET) - Retrieve all locations associated with a specific trip
router.get('/trip/:tripId', (req, res) => {
    const tripId = req.params.tripId;
    const filteredLocations = locations.filter(location => location.tripId === tripId);
    
    if (filteredLocations.length > 0) {
      res.json(filteredLocations);
    } else {
      res.status(404).json({ error: 'No locations found for this trip' });
    }
  });

// TODO: Create a new location (POST) - Add a new location to a trip and respond with the newly created location data


// TODO: Update location information (PUT) - Modify location data and respond with the updated location information


// TODO: Delete a location (DELETE) - Remove the specified location and respond with a confirmation message

export default router;
