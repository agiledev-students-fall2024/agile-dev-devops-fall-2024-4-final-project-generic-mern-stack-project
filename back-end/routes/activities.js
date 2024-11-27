import express from 'express';
// import * as activitiesController from '../controllers/activitiesController.js';
import activitiesController from '../controllers/activitiesController.js';
import fs from 'fs';

const router = express.Router();

// Get all activities (GET) - Retrieve and respond with a list of all activities in the system
router.get('/', activitiesController.getActivities);

//TODO: build the controller
router.post('/', activitiesController.createActivity);

// Get activities by locationId
router.get('/location/:locationId', activitiesController.getActivitiesByLocation);


// Create a new activity (POST) - Add a new activity within a location and respond with the newly created activity data
//note: we don't have any error handling here, we need to add this once we include the database connection.
// ie. if it fails to send the data to the database, it should send back a 4xx code, although it may not be possible because
//form submit only happens when all fields are inputted correctly
router.post('/', activitiesController.createActivity);

// Nice to have: We don't have an edit functionality yet
// Update activity information (PUT) - Modify the specified activity data and respond with the updated activity information
// router.put('/:activityId', (req, res) => {
//     const activityId = req.params.activityId;
//     const activityIndex = activities.findIndex(a => a.id === activityId);
  
//     if (activityIndex !== -1) {
//       activities[activityIndex] = { ...activities[activityIndex], ...req.body };
//       fs.writeFileSync('./mock-data/activities.json', JSON.stringify(activities, null, 2), 'utf-8');
//       res.json(activities[activityIndex]);
//     } else {
//       res.status(404).json({ error: 'Activity not found' });
//     }
//   });  

// Currently, we don't have a delete button
// // Delete an activity (DELETE) - Remove the specified activity and respond with a confirmation message
// router.delete('/:activityId', (req, res) => {
//     const activityId = req.params.activityId;
//     const activityIndex = activities.findIndex(a => a.id === activityId);
  
//     if (activityIndex !== -1) {
//       activities.splice(activityIndex, 1);
//       fs.writeFileSync('./mock-data/activities.json', JSON.stringify(activities, null, 2), 'utf-8');
//       res.json({ message: 'Activity deleted successfully' });
//     } else {
//       res.status(404).json({ error: 'Activity not found' });
//     }
//   });  

// Upvote an activity (POST) - Increment the vote count for an activity and respond with the updated vote count
router.post('/:activityId/upvote', activitiesController.upvoteActivity);

// Downvote an activity (POST) - Decrement the vote count for an activity and respond with the updated vote count
router.post('/:activityId/downvote', activitiesController.downvoteActivity);

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