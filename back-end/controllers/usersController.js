import User from '../models/User.js'; // User model
import Trip from '../models/Trip.js'; // Trip model

// Get all users (GET) - Retrieve and respond with a list of all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Get a specific user by ID (GET) - Retrieve details for the specified user, including their associated trips
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('trips'); 
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the user' });
  }
};

// Get trips associated with a user (GET) - Retrieve and respond with a list of trips for a specific user by userId
export const getUserTrips = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('trips'); 
    if (user && user.trips.length > 0) {
      res.json(user.trips);
    } else {
      res.status(404).json({ error: 'No trips found for this user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve trips for the user' });
  }
};
