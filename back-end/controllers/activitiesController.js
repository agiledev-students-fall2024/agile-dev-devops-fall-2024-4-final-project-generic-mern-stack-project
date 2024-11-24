import Activity from '../models/Activity.js'

// get all activities (GET)
const getActivities = async (req, res) => {
    const activities = await Activity.find({})
    res.status(200).json(activities)
}

// get activities by locationId (GET)

// create new activity (POST)

// upvote an activity (POST)

// downvote an activity (POST)

// add a comment to activity (POST)

// delete a comment (DELETE)

const activitiesController = {
    getActivities,
};

export default activitiesController;