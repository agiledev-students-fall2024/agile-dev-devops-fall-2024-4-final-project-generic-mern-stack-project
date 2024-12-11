const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Pin = require('../models/Pin');

// Mock pin data for testing
const pins = [
    {
        id: 1,
        userId: 123,
        message: 'Where it all begins.',
        location: [40.7309, -73.9973],
    },
    {
        id: 2,
        userId: 123,
        message: 'I am another default pin.',
        location: [40.73055766427531, -73.99614393711092],
    },
    {
        id: 3,
        userId: 456,
        message: 'I am a third default pin.',
        location: [40.7309, -73.9980],
    },
];

// Route to get all pins
router.get('/', async (req, res) => {
    try {
        const pins = await Pin.find();
        res.json(pins);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pins.' });
    }
});

// Route to get all pins for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const userPins = await Pin.find({ userId: req.params.userId });
        if (userPins.length === 0) {
            return res.status(404).json({ message: 'No pins found for this user.' });
        }
        res.json(userPins);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user pins.' });
    }
});

// Route to get a specific pin by ID
router.get('/:id', async (req, res) => {
    try {
        const pin = await Pin.findById(req.params.id);
        if (!pin) {
            return res.status(404).json({ message: 'Pin not found.' });
        }
        res.status(200).json(pin);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pin.' });
    }
});

// Route to create a new pin
router.post('/', async (req, res) => {
    try {
        const { userId, message, location } = req.body;
        // validate required fields
        if (!message || !location || location.length !== 2) {
            return res.status(400).json({ error: 'message and location fields are required.' });
        }
        const newPin = new Pin({
            userId,
            message,
            location,
        });
        const savedPin = await newPin.save();
        res.status(201).json(savedPin);
    } catch (error) {
        res.status(400).json({ error: 'Error creating pin.' });
    }
});

// Route to update an existing pin by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedPin = await Pin.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators: true});
        if (!updatedPin) {
            return res.status(404).json({ message: 'Pin not found.' });
        }
        res.json(updatedPin);
    } catch (error) {
        res.status(400).json({ error: 'Error updating pin.' });
    }
});

// Route to delete a pin by ID
router.delete('/:id', async (req, res) => {
    try {
      const deletedPin = await Pin.findByIdAndDelete(req.params.id);
      if (!deletedPin) {
        return res.status(404).json({ message: 'Pin not found.' });
      }
      res.status(200).json({ message: 'Pin deleted successfully', id: deletedPin._id });
    } catch (error) {
      console.error("Error deleting pin:", error);
      res.status(500).json({ error: 'Error deleting pin.' });
    }
  });
  



// Route to search pins by a keyword in the message
router.get('/search', (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword query parameter is required.' });
    }
    const matchingPins = pins.filter((pin) =>
        pin.message.toLowerCase().includes(keyword.toLowerCase())
    );
    res.json(matchingPins);
});

// Route to fetch the latest N pins
router.get('/latest/:count', (req, res) => {
    const count = parseInt(req.params.count, 10);
    if (isNaN(count) || count <= 0) {
        return res.status(400).json({ error: 'Count parameter must be a positive number.' });
    }
    const latestPins = pins.slice(-count);
    res.json(latestPins);
});

module.exports = router;
