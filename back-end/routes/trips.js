// routes/trips.js
import express from 'express';
import trips from '../data/trips.json' assert { type: 'json' };

const router = express.Router();

// GET all trips
router.get('/', (req, res) => {
  res.json(trips);
});

// GET trip by ID
router.get('/:tripId', (req, res) => {
  const trip = trips.find(t => t.id === req.params.tripId);
  trip ? res.json(trip) : res.status(404).json({ error: 'Trip not found' });
});

export default router;
