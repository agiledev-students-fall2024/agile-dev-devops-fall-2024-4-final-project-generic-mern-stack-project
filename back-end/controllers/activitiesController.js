import Activity from '../models/Activity.js'; // Activity model

// Get all activities (GET) - Retrieve and respond with a list of all activities in the system
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find(); 
    res.status(200).json(activities); 
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Failed to retrieve activities' }); 
  }
};

// Get activities by locationId (GET) - Retrieve activities filtered by a specific location
const getActivitiesByLocation = async (req, res) => {
  try {
    const { locationId } = req.params; // Extract locationId from the request parameters
    const activities = await Activity.find({ locationId }); // Find activities with the given locationId

    if (activities.length > 0) {
      res.status(200).json(activities); // Respond with the filtered activities
    } else {
      res.status(404).json({ error: 'No activities found for this location' }); // Handle case where no activities are found
    }
  } catch (error) {
    console.error('Error fetching activities by location:', error);
    res.status(500).json({ error: 'Failed to retrieve activities for this location' }); // Handle errors
  }
};

// Placeholder functions for other routes
const createActivity = async (req, res) => {
  res.status(501).json({ message: 'Create activity endpoint not implemented yet' });
};

const upvoteActivity = async (req, res) => {
  res.status(501).json({ message: 'Upvote activity endpoint not implemented yet' });
};

const downvoteActivity = async (req, res) => {
  res.status(501).json({ message: 'Downvote activity endpoint not implemented yet' });
};

const addCommentToActivity = async (req, res) => {
  res.status(501).json({ message: 'Add comment endpoint not implemented yet' });
};

const deleteCommentFromActivity = async (req, res) => {
  res.status(501).json({ message: 'Delete comment endpoint not implemented yet' });
};

// Export all controller functions as a single default object
export default {
  getActivities,
  getActivitiesByLocation,
  createActivity,
  upvoteActivity,
  downvoteActivity,
  addCommentToActivity,
  deleteCommentFromActivity,
};
