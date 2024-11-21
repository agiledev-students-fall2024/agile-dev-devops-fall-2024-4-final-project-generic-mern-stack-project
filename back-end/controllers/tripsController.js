import Trip from '../models/Trip.js'; // Trip model
import Location from '../models/Location.js'; // Location model

// Get all trips (GET) - Retrieve and respond with a list of all trips in the system
export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find(); // Removed field restrictions
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve trips' });
  }
};

// Get a specific trip by ID (GET) - Retrieve details for the specified trip, including associated locations and participants
export const getTripById = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const trip = await Trip.findById(tripId)
      .populate('participants') 
      .populate('locations');   
    if (trip) {
      res.json(trip);
    } else {
      res.status(404).json({ error: 'Trip not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the trip' });
  }
};

// Get locations for a specific trip by tripId
export const getTripLocations = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const trip = await Trip.findById(tripId).populate('locations'); // Removed field restrictions
    if (trip && trip.locations.length > 0) {
      res.json(trip.locations);
    } else {
      res.status(404).json({ error: 'No locations found for this trip' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve locations for the trip' });
  }
};
