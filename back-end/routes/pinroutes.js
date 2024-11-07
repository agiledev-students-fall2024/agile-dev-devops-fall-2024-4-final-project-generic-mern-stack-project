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
        location: [40.7326, -73.9973] 

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
        location: req.body.message,
    }

    pins.push(newPin)
    res.status(201).json(newPin); // send new pin data 
});

// put update existing pin by id
router.put('/pins/:id', (req, res) => {
    const pin = pins.find(p => p.id === parseInt(req.params.id));

    if (pin) {
        message: req.body.message
        res.json(pin)
    } else {
        res.status(404).json({ message: 'Pin not found'})
    }

});

// delete pin by id
router.delete('/pins/:id', (req, res) => {
    const pinIndex = pins.findIndex(p => p.id === parseInt(req.params.id));

    if (pinIndex !== -1) { // if pin exists
       pins.splice(pinIndex, 1);
    } else {
        res.status(404).json({ message: 'Pin not found' });
    }

});

module.exports = router;