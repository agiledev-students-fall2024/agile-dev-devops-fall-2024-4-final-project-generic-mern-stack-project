import express from 'express';
import fs from 'fs';

const router = express.Router();
const activities = JSON.parse(fs.readFileSync('./mock-data/activities.json', 'utf-8'));

// TODO: Get all activities (GET) - Retrieve and respond with a list of all activities in the system
router.get('/', (req, res) => {
    res.json(activities);
  });  

// TODO: Get a specific activity by ID (GET) - Retrieve details for the specified activity, including embedded comments
router.get('/:activityId', (req, res) => {
    const activityId = req.params.activityId;
    const activity = activities.find(a => a.id === activityId);
  
    if (activity) {
      res.json(activity);
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  });

// TODO: Create a new activity (POST) - Add a new activity within a location and respond with the newly created activity data
router.post('/', (req, res) => {
    const newActivity = {
      id: `activity_${Date.now()}`,
      ...req.body
    };
  
    activities.push(newActivity);
    fs.writeFileSync('./mock-data/activities.json', JSON.stringify(activities, null, 2), 'utf-8');
    res.status(201).json(newActivity);
  });  

// TODO: Update activity information (PUT) - Modify the specified activity data and respond with the updated activity information
router.put('/:activityId', (req, res) => {
    const activityId = req.params.activityId;
    const activityIndex = activities.findIndex(a => a.id === activityId);
  
    if (activityIndex !== -1) {
      activities[activityIndex] = { ...activities[activityIndex], ...req.body };
      fs.writeFileSync('./mock-data/activities.json', JSON.stringify(activities, null, 2), 'utf-8');
      res.json(activities[activityIndex]);
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  });  

// TODO: Delete an activity (DELETE) - Remove the specified activity and respond with a confirmation message
router.delete('/:activityId', (req, res) => {
    const activityId = req.params.activityId;
    const activityIndex = activities.findIndex(a => a.id === activityId);
  
    if (activityIndex !== -1) {
      activities.splice(activityIndex, 1);
      fs.writeFileSync('./mock-data/activities.json', JSON.stringify(activities, null, 2), 'utf-8');
      res.json({ message: 'Activity deleted successfully' });
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  });  

// TODO: Upvote an activity (POST) - Increment the vote count for an activity and respond with the updated vote count


// TODO: Downvote an activity (POST) - Decrement the vote count for an activity and respond with the updated vote count


// TODO: Add a comment to an activity (POST) - Add a new comment to the activity and respond with the created comment data


// TODO: Update a comment (PUT) - Modify the specified comment on an activity and respond with updated comment information


// TODO: Delete a comment (DELETE) - Remove the specified comment and respond with a confirmation message


export default router;
