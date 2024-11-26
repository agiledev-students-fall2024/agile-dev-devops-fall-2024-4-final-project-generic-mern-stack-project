const express = require('express');
const router = express.Router();

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
router.get('/', (req, res) => {
    res.json(pins);
});

// Route to get all pins for a specific user
router.get('/user/:userId', (req, res) => {
    const userPins = pins.filter((p) => p.userId === parseInt(req.params.userId));
    if (userPins.length === 0) {
        return res.status(404).json({ message: 'User not found.' });
    }
    res.json(userPins);
});

// Route to get a specific pin by ID
router.get('/:id', (req, res) => {
    const pin = pins.find((p) => p.id === parseInt(req.params.id));
    if (pin) {
        res.json(pin);
    } else {
        res.status(404).json({ message: 'Pin not found.' });
    }
});

// Route to create a new pin
router.post('/', (req, res) => {
    const newPin = {
        id: pins.length + 1, // Incremental ID for simplicity
        userId: req.body.userId,
        message: req.body.message,
        location: req.body.location,
    };

    pins.push(newPin);
    res.status(201).json(newPin);
});

// Route to update an existing pin by ID
router.put('/:id', (req, res) => {
    const pin = pins.find((p) => p.id === parseInt(req.params.id));
    if (pin) {
        pin.message = req.body.message;
        res.status(200).json(pin);
    } else {
        res.status(404).json({ message: 'Pin not found.' });
    }
});

// Route to delete a pin by ID
router.delete('/:id', (req, res) => {
    const pinIndex = pins.findIndex((p) => p.id === parseInt(req.params.id));
    if (pinIndex !== -1) {
        pins.splice(pinIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Pin not found.' });
    }
});

// Route to return dynamically generated mock pins
router.get('/mock', (req, res) => {
    const mockPins = [
        { id: 101, userId: 111, message: 'Mock memory 1.', location: [40.7419, -73.9850] },
        { id: 102, userId: 112, message: 'Mock memory 2.', location: [40.7420, -73.9840] },
        { id: 103, userId: 113, message: 'Mock memory 3.', location: [40.7430, -73.9830] },
    ];
    res.json(mockPins);
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
