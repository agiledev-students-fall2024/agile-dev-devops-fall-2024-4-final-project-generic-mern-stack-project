const express = require('express');
const router = express.Router();
const CalendarEvent = require('../models/CalendarEvent'); 

// GET /calendar/month/:year/:month - Fetch events for a specific month
router.get('/calendar/month/:year/:month', async (req, res) => {
  const { year, month } = req.params;

  try {
    const events = await CalendarEvent.find({
      date: {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1)
      }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly events", error });
  }
});

// GET /calendar/day/:date - Fetch events for a specific day
router.get('/calendar/day/:date', async (req, res) => {
  const { date } = req.params;

  try {
    const events = await CalendarEvent.find({
      date: {
        $eq: new Date(date)
      }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching daily events", error });
  }
});

// POST /calendar/event - Create a new event
router.post('/calendar/event', async (req, res) => {
  const { title, date, description } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: "Title and date are required" });
  }

  try {
    const newEvent = new CalendarEvent({ title, date, description });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
});

// PUT /calendar/event/:id - Update an existing event
router.put('/calendar/event/:id', async (req, res) => {
  try {
    const updatedEvent = await CalendarEvent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
});

// DELETE /calendar/event/:id - Delete an event by ID
router.delete('/calendar/event/:id', async (req, res) => {
  try {
    await CalendarEvent.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
});

module.exports = router;
