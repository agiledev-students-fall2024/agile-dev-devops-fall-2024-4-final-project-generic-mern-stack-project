import express from 'express';
import locationsController from '../controllers/locationsController.js';
import fs from 'fs';

const router = express.Router();
const locations = JSON.parse(fs.readFileSync('./mock-data/locations.json', 'utf-8'));


//get all information for a specific location (which includes it's activities)
router.get('/:locationId', locationsController.getLocation);

//get activities for location
router.get('/activities/:locationId', locationsController.getLocationActivities);

//get the location using a location id

  

//not needed anymore because @ant built this in trips.js
// Get locations by Trip ID (GET) - Retrieve all locations associated with a specific trip
// router.get('/trip/:tripId', (req, res) => {
//     const tripId = req.params.tripId;
//     const filteredLocations = locations.filter(location => location.tripId === tripId);
    
//     if (filteredLocations.length > 0) {
//       res.json(filteredLocations);
//     } else {
//       res.status(404).json({ error: 'No locations found for this trip' });
//     }
//   });

// TODO: Create a new location (POST) - Add a new location to a trip and respond with the newly created location data
router.post('/', (req, res)=>{
  const newLocation = {
    ...req.body,
    status: 'upcoming',
    activities: [],
    id: `location_${Date.now()}`,
    image: "https://picsum.photos/200/305" //right now, not implementing the upload photo route
  };
  console.log('new location:'); //instead, this should be a backend connection that goes to the database
  console.log(newLocation);
  res.status(201).json(newLocation);
});

//Streth Goal Routes
// TODO: Update location information (PUT) - Modify location data and respond with the updated location information
// TODO: Delete a location (DELETE) - Remove the specified location and respond with a confirmation message

export default router;
