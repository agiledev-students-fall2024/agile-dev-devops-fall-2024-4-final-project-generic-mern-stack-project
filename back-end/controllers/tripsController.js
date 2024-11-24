import Trip from '../models/Trip.js'; // Trip model
import User from '../models/User.js'; // User model

// Get all trips (GET) - Retrieve and respond with a list of all trips in the system
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate('participants') // Populate participant details
      .populate('locations');   // Populate location details
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ error: 'Failed to retrieve trips' });
  }
};

// Get a specific trip by ID (GET) - Retrieve details for the specified trip, including associated locations and participants
const getTripById = async (req, res) => {
  try {
    const tripId = req.params.tripId; // Extract trip ID from the request parameters
    const trip = await Trip.findById(tripId)
      .populate('participants') // Include full details for participants
      .populate('locations');   // Include full details for locations

    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json({ error: 'Trip not found' });
    }
  } catch (error) {
    console.error('Error fetching trip by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve the trip' });
  }
};

// Get locations for a specific trip by tripId (GET) - Retrieve only the locations associated with a specific trip
const getTripLocations = async (req, res) => {
  try {
    const tripId = req.params.tripId; // Extract trip ID from the request parameters
    const trip = await Trip.findById(tripId).populate('locations'); // Populate the locations field

    if (trip && trip.locations.length > 0) {
      res.status(200).json(trip.locations);
    } else {
      res.status(404).json({ error: 'No locations found for this trip' });
    }
  } catch (error) {
    console.error('Error fetching trip locations:', error);
    res.status(500).json({ error: 'Failed to retrieve locations for the trip' });
  }
};

// Create a new trip (POST) - Add a new trip to the system and respond with the newly created trip data
const createTrip = async (req, res) => {
  try {
    // Prepare new trip data from the request body
    const newTripData = {
      ...req.body,
      status: 'upcoming', // Set default status to "upcoming"
    };

    const newTrip = new Trip(newTripData); // Create a new Trip instance
    await newTrip.save(); // Save the new trip to the database

    res.status(201).json(newTrip); // Respond with the newly created trip
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ error: 'Failed to create the trip' });
  }
};

// Join a Trip (POST) - Add a user to a trip's participants and the trip to the user's list
const joinTrip = async (req, res) => {
  try {
    const { tripId } = req.params; // Extract trip ID from the request parameters
    const { userId } = req.body; // Extract user ID from the request body

    const trip = await Trip.findById(tripId); // Find the trip by ID
    const user = await User.findById(userId); // Find the user by ID

    if (!trip) return res.status(404).json({ error: 'Trip not found' }); // Handle case where trip does not exist
    if (!user) return res.status(404).json({ error: 'User not found' }); // Handle case where user does not exist

    // Check if the user is already a participant
    if (trip.participants.includes(userId)) {
      return res.status(400).json({ error: 'User is already a participant in this trip' });
    }

    // Add user to trip participants
    trip.participants.push(userId);

    // Add trip to user's list of trips
    user.trips.push(tripId);

    // Save changes to both trip and user
    await trip.save();
    await user.save();

    res.status(200).json({ message: 'Successfully joined the trip', trip });
  } catch (error) {
    console.error('Error joining trip:', error);
    res.status(500).json({ error: 'Failed to join the trip' });
  }
};

// Update trip status (PUT) - Modify the status of a trip (e.g., upcoming, ongoing, completed)
const updateTripStatus = async (req, res) => {
  try {
    const { tripId } = req.params; // Extract trip ID from the request parameters
    const { status } = req.body; // Extract the new status from the request body

    const trip = await Trip.findById(tripId); // Find the trip by ID

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' }); // Handle case where trip does not exist
    }

    trip.status = status; // Update the status field
    await trip.save(); // Save the changes to the database

    res.status(200).json({ message: 'Trip status updated successfully', trip }); // Respond with the updated trip
  } catch (error) {
    console.error('Error updating trip status:', error);
    res.status(500).json({ error: 'Failed to update trip status' });
  }
};

// Placeholder functions for other routes
const updateTrip = async (req, res) => {
  res.status(501).json({ message: 'Update trip endpoint not implemented yet' });
};

const deleteTrip = async (req, res) => {
  res.status(501).json({ message: 'Delete trip endpoint not implemented yet' });
};

// Export all controller functions as a single default object
export default {
  getAllTrips,
  getTripById,
  getTripLocations,
  createTrip,
  joinTrip,
  updateTripStatus,
  updateTrip,
  deleteTrip,
};
