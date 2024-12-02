const express = require('express');
const router = express.Router();
const mockFeedbackData = require('./mockFeedbackData.json'); // Load mock data

let feedbacks = [...mockFeedbackData]; // Start with mock data, replace with DB later

router.post("/", (req, res) => {
    const { answer1, answer2, answer3 } = req.body;

    if (!answer1 || !answer2 || !answer3) {
        return res.status(400).json({ message: "All questions are required" });
    }

    const newFB = {
        id: feedbacks.length + 1,
        answer1,
        answer2,
        answer3,
        timestamp: new Date()
    };

    feedbacks.push(newFB);
    res.status(201).json({ message: "Feedback saved successfully", feedback: newFB });
});

router.get("/", (req, res) => {
    res.json(feedbacks);
});

module.exports = router;
