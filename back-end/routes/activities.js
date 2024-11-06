import express from 'express';
import fs from 'fs';

const router = express.Router();
const activities = JSON.parse(fs.readFileSync('./mock-data/activities.json', 'utf-8'));

// TODO: Get all activities (GET) - Retrieve and respond with a list of all activities in the system


// TODO: Get a specific activity by ID (GET) - Retrieve details for the specified activity, including embedded comments


// TODO: Create a new activity (POST) - Add a new activity within a location and respond with the newly created activity data


// TODO: Update activity information (PUT) - Modify the specified activity data and respond with the updated activity information


// TODO: Delete an activity (DELETE) - Remove the specified activity and respond with a confirmation message


// TODO: Upvote an activity (POST) - Increment the vote count for an activity and respond with the updated vote count


// TODO: Downvote an activity (POST) - Decrement the vote count for an activity and respond with the updated vote count


// TODO: Add a comment to an activity (POST) - Add a new comment to the activity and respond with the created comment data


// TODO: Update a comment (PUT) - Modify the specified comment on an activity and respond with updated comment information


// TODO: Delete a comment (DELETE) - Remove the specified comment and respond with a confirmation message


export default router;
