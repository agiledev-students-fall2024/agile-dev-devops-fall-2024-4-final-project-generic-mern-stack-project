const express = require('express');
const router = express.Router();


const pins = [
    {
        id: 1, 
        userId: 123,
        message: 'Where it all begins.', 
        location: [40.7309, -73.9973] 

    },

    {
        id: 2, 
        userId: 123,
        message: 'I am another default pin', 
        location: [40.73055766427531, -73.99614393711092] 

    },

    {
        id: 3, 
        userId: 456,
        message: 'I am a third default pin', 
        location: [40.7309, -73.9980] 

    },

];

// get all pins
router.get('/pins', (req, res) => {
    res.json(pins);
});

// get all pins for user
router.get('/pins/user/:userId', (req, res) => {
    const userPins = pins.filter(p => p.userId === parseInt(req.params.userId));
    res.json(userPins);
});

// get pin by id
router.get('/pins/:id', (req, res) => {
    const pin = pins.find(p => p.id === parseInt(req.params.id));

    if (pin) {
        res.json(pin); // send pin data
    } else {
        res.status(404).json({ message: 'Pin not found' }); // send error
    }

});

// post create new pin
router.post('/pins', (req, res) => {
    const newPin = {
        id: pins.length + 1, // add actual functionality when db is made
        userId: req.body.userId,
        message: req.body.message,
        location: req.body.location,
    }

    pins.push(newPin)
    res.status(201).json(newPin); // send new pin data 
});

// put update existing pin by id
router.put('/pins/:id', (req, res) => {
    const pin = pins.find(p => p.id === parseInt(req.params.id));

    if (pin) {
        pin.message = req.body.message
        res.status(200).json(pin);
    } else {
        res.status(404).json({ message: 'Pin not found'})
    }

});

// delete pin by id
router.delete('/pins/:id', (req, res) => {
    const pinIndex = pins.findIndex(p => p.id === parseInt(req.params.id));

    if (pinIndex !== -1) { // if pin exists
       pins.splice(pinIndex, 1);
       res.status(204).send();
    } else {
        res.status(404).json({ message: 'Pin not found' });
    }

});

// Additional route to return mock pins dynamically
router.get('/pins/mock', (req, res) => {
    const mockPins = [
      { id: 101, userId: 111, message: 'Mock memory 1.', location: [40.7419, -73.9850] },
      { id: 102, userId: 112, message: 'Mock memory 2.', location: [40.7420, -73.9840] },
      { id: 103, userId: 113, message: 'Mock memory 3.', location: [40.7430, -73.9830] },
    ];
    res.json(mockPins);
  });
  
  // Route to search pins by keyword in the message
  router.get('/pins/search', (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword query parameter is required' });
    }
    const matchingPins = pins.filter(pin => pin.message.toLowerCase().includes(keyword.toLowerCase()));
    res.json(matchingPins);
  });
  
  // Route to fetch the latest N pins
  router.get('/pins/latest/:count', (req, res) => {
    const count = parseInt(req.params.count, 10);
    if (isNaN(count) || count <= 0) {
      return res.status(400).json({ error: 'Count parameter must be a positive number' });
    }
    const latestPins = pins.slice(-count);
    res.json(latestPins);
  }); 

module.exports = router;