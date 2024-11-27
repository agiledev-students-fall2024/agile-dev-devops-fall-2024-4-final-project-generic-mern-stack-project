import Activity from '../models/Activity.js'; // Activity model
import Location from '../models/Location.js'; //Location model used to get the tripId

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

const createActivity = async (req, res) => {

  try{
    //get info from submitted form
    const { name, description, price, locationId } = req.body;

    //get associated tripId
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    const tripId = location.tripId;

    //create the new activity
    const newActivity = new Activity({
      name,
      description,
      locationId,
      tripId,
      price,
      description: '',
      createdBy: '64b1c7c8f2a5b9a2d5c8f001',
      // just took a random userId i found in the database tbh, lol, i've no idea which user this actually is hahaha
      //maybe we set this through auth?
      type: 'activities', //this also shouldn't be directly set to activities, but we haven't set this in the form
      //we also might just get rid of this filter so...
    });

    //save the activity
    const savedActivity = await newActivity.save();

    //append the new activity to the associated location
    const updatedLocation = await Location.findByIdAndUpdate(
      locationId, //this is what we are searching by
      { $push: { activities: savedActivity._id } }, //this is what does the appending
      { new: true } //this returns the updated location in case we want to send it back too
    );

    res.status(201).json({
      message: 'activity created successfully :)',
      activity: savedActivity,
      updatedLocation: updatedLocation
    });

  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'failed to add activity :(' });
  };
};

const upvoteActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    // Fetch the activity by ID
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    // Increment votes
    activity.votes = (activity.votes || 0) + 1;

    // Save updated activity
    const updatedActivity = await activity.save();

    res.status(200).json({ votes: updatedActivity.votes });
  } catch (error) {
    console.error('Error in upvoteActivity:', error);
    res.status(500).json({ error: 'Failed to upvote activity' });
  }
};


// const downvoteActivity = async (req, res) => {
//   res.status(501).json({ message: 'Downvote activity endpoint not implemented yet' });
// };

const downvoteActivity = async (req, res) => {
  try {
    const { activityId } = req.params; // Extract the activity ID from request parameters

    // Find the activity by its ID
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' }); // Handle activity not found
    }

    // Decrement the votes field
    activity.votes = (activity.votes || 0) - 1;

    // Save the updated activity back to the database
    const updatedActivity = await activity.save();

    // Respond with the updated votes count
    res.status(200).json({ votes: updatedActivity.votes });
  } catch (error) {
    console.error('Error downvoting activity:', error);
    res.status(500).json({ error: 'Failed to downvote activity' }); // Handle errors
  }
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
