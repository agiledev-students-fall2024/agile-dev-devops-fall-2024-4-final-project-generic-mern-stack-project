import express from 'express';
import fs from 'fs';

const router = express.Router();
const activities = JSON.parse(fs.readFileSync('./mock-data/activities.json', 'utf-8'));
const activitiesPath = './mock-data/activities.json'; // Define activitiesPath globally

// Get all activities (GET) - Retrieve and respond with a list of all activities in the system
router.get('/', (req, res) => {
    res.json(activities);
  });  

  const saveActivitiesToFile = () => {
    fs.writeFileSync(activitiesPath, JSON.stringify(activities, null, 2), 'utf-8');
  };


router.get('/location/:locationId', (req, res) => {
    const locationId = req.params.locationId;
    const filteredActivities = activities.filter(activity => activity.locationId === locationId);
  
    if (filteredActivities.length > 0) {
      res.json(filteredActivities);
    } else {
      res.status(404).json({ error: 'No activities found for this location' });
    }
  });
  
// I think this might not need to be used, could delete @ant
// Get a specific activity by ID (GET) - Retrieve details for the specified activity, including embedded comments
router.get('/:activityId', (req, res) => {
    const activityId = req.params.activityId;
    const activity = activities.find(a => a.id === activityId);
  
    if (activity) {
      res.json(activity);
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  });

// Create a new activity (POST) - Add a new activity within a location and respond with the newly created activity data
router.post('/', (req, res) => {
    const newActivity = {
      id: `activity_${Date.now()}`, // @ant what is the correct way for me to create activity IDs?
      ...req.body // right now, we are getting incomplete forms so the object data is also incomplete
    };
  
    console.log(newActivity);
    // activities.push(newActivity);
    // fs.writeFileSync('./mock-data/activities.json', JSON.stringify(activities, null, 2), 'utf-8');
    res.status(201).json(newActivity);
  });

// We don't have an edit functionality yet
// Update activity information (PUT) - Modify the specified activity data and respond with the updated activity information
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

// Currently, we don't have a delete button
// Delete an activity (DELETE) - Remove the specified activity and respond with a confirmation message
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

// Upvote an activity (POST) - Increment the vote count for an activity and respond with the updated vote count
router.post('/:activityId/upvote', (req, res) => {
  const activityId = req.params.activityId;
  const activity = activities.find(a => a.id === activityId);

  if (activity) {
    activity.votes = (activity.votes || 0) + 1;
    activities.sort((a, b) => b.votes - a.votes); 
    saveActivitiesToFile();
    res.json({ votes: activity.votes });
  } else {
    res.status(404).json({ error: 'Activity not found' });
  }
});

// Downvote an activity (POST) - Decrement the vote count for an activity and respond with the updated vote count
router.post('/:activityId/downvote', (req, res) => {
  const activityId = req.params.activityId;
  const activity = activities.find(a => a.id === activityId);

  if (activity) {
    activity.votes = (activity.votes || 0) - 1;
    activities.sort((a, b) => b.votes - a.votes); 
    saveActivitiesToFile();
    res.json({ votes: activity.votes });
  } else {
    res.status(404).json({ error: 'Activity not found' });
  }
});

// Add a comment to an activity (POST) - Add a new comment to the activity and respond with the created comment data
router.post('/:activityId/comments', (req, res) => {
  const activityId = req.params.activityId;
  const activity = activities.find(a => a.id === activityId);

  if (activity) {
    const newComment = {
      id: `comment_${Date.now()}`,
      userId: req.body.userId,
      commentString: req.body.commentString
    };
    activity.comments.push(newComment);
    saveActivitiesToFile();
    res.status(201).json(newComment);
  } else {
    res.status(404).json({ error: 'Activity not found' });
  }
});

//I removed update bc it seem redundant and not needed for now we can implement later if wanted

// Delete a comment (DELETE) - Remove the specified comment and respond with a confirmation message
router.delete('/:activityId/comments/:commentId', (req, res) => {
  const activityId = req.params.activityId;
  const commentId = req.params.commentId;
  const activity = activities.find(a => a.id === activityId);

  if (activity) {
    const commentIndex = activity.comments.findIndex(c => c.id === commentId);
    if (commentIndex !== -1) {
      activity.comments.splice(commentIndex, 1);
      saveActivitiesToFile();
      res.json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } else {
    res.status(404).json({ error: 'Activity not found' });
  }
});

export default router;