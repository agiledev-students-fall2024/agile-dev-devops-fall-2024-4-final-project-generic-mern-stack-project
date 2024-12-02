const express = require('express');
const router = express.Router();
const mockContactData = require('./mockContactData.json'); // Load mock data

let contacts = [...mockContactData]; // Start with mock data, replace with DB later

router.post("/", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = {
        id: contacts.length + 1,
        name,
        email,
        message,
        timestamp: new Date()
    };

    contacts.push(newContact);
    res.status(201).json({ message: "Contact saved successfully", contact: newContact });
});

router.get("/", (req, res) => {
    res.json(contacts);
});

module.exports = router;
