const express = require('express');
const router = express.Router();
const mockFeedbackData = require('./mockFeedbackData.json'); // Load mock data
const { validateFeedback, handleValidationErrors } = require('../validators/feedbackValidator');

let feedbacks = [...mockFeedbackData]; // Start with mock data, replace with DB later

// POST route to create new feedback
router.post(
  '/',
  validateFeedback, // Apply validation rules
  handleValidationErrors, // Handle validation errors
  (req, res) => {
    const { answer1, answer2, answer3 } = req.body;

    const newFB = {
      id: feedbacks.length + 1,
      answer1,
      answer2,
      answer3,
      timestamp: new Date(),
    };

    feedbacks.push(newFB);
    res.status(201).json({ message: 'Feedback saved successfully', feedback: newFB });
  }
);

// PUT route to update feedback by ID
router.put(
  '/:id',
  validateFeedback, // Apply validation rules
  handleValidationErrors, // Handle validation errors
  (req, res) => {
    const { id } = req.params;
    const { answer1, answer2, answer3 } = req.body;

    const feedbackIndex = feedbacks.findIndex((f) => f.id === parseInt(id));
    if (feedbackIndex === -1) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Update feedback
    feedbacks[feedbackIndex] = {
      ...feedbacks[feedbackIndex],
      answer1,
      answer2,
      answer3,
      timestamp: new Date(), // Update timestamp
    };

    res.status(200).json({ message: 'Feedback updated successfully', feedback: feedbacks[feedbackIndex] });
  }
);

// GET route to retrieve all feedback
router.get('/', (req, res) => {
  res.json(feedbacks);
});

module.exports = router;

