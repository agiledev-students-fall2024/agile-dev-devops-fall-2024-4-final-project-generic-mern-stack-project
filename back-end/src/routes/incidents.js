const express = require('express');
const router = express.Router();
const {
  getIncidents,
  reportIncident,
} = require('../controllers/incidentController');

/**
 * @route GET /api/incidents
 * @description Retrieve all reported incidents.
 */
router.get('/', getIncidents);

/**
 * @route POST /api/incidents
 * @description Report a new incident.
 */
router.post('/', reportIncident);

module.exports = router;
