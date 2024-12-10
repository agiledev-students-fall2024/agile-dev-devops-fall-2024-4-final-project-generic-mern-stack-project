const express = require('express');
const router = express.Router();
const mockContactData = require('./mockContactData.json'); // Load mock data
const { validateContact, handleValidationErrors } = require('../validators/contactValidator');

let contacts = [...mockContactData]; // Start with mock data, replace with DB later

// POST route to create a new contact
router.post(
  '/',
  validateContact,
  handleValidationErrors,
  (req, res) => {
    const { name, email, message } = req.body;

    const newContact = {
      id: contacts.length + 1,
      name,
      email,
      message,
      timestamp: new Date(),
    };

    contacts.push(newContact);
    res.status(201).json({ message: 'Contact saved successfully', contact: newContact });
  }
);

// PUT route to update an existing contact by ID
router.put(
  '/:id',
  validateContact, // Apply validation rules
  handleValidationErrors, // Handle validation errors
  (req, res) => {
    const { id } = req.params;
    const { name, email, message } = req.body;

    const contactIndex = contacts.findIndex((c) => c.id === parseInt(id));
    if (contactIndex === -1) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Update the contact
    contacts[contactIndex] = {
      ...contacts[contactIndex],
      name,
      email,
      message,
      timestamp: new Date(), // Update timestamp
    };

    res.status(200).json({ message: 'Contact updated successfully', contact: contacts[contactIndex] });
  }
);

// GET route to retrieve all contacts
router.get('/', (req, res) => {
  res.json(contacts);
});

module.exports = router;

