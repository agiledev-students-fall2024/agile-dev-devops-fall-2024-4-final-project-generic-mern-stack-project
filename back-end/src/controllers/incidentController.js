const fs = require('fs');
const path = require('path');

const incidentsPath = path.join(__dirname, '../data/incidents.json');

/**
 * Reads incidents from the JSON file.
 * @returns {Array} Array of incidents.
 */
const readIncidentsFromFile = () => {
  const data = fs.readFileSync(incidentsPath, 'utf8');
  return JSON.parse(data);
};

/**
 * Writes incidents to the JSON file.
 * @param {Array} incidents - Array of incidents to write to the file.
 */
const writeIncidentsToFile = (incidents) => {
  fs.writeFileSync(incidentsPath, JSON.stringify(incidents, null, 2), 'utf8');
};

/**
 * Reports a new incident.
 * @function reportIncident
 * @param {Object} req - Request object with incident data.
 * @param {Object} res - Response object for sending confirmation.
 */
const reportIncident = async (req, res) => {
  // Replace with implementation for reporting an incident
};

/**
 * Retrieves all reported incidents.
 * @function getIncidents
 * @param {Object} req - Request object.
 * @param {Object} res - Response object for sending incidents.
 */
const getIncidents = async (req, res) => {
  try {
    // Read incidents from the JSON file
    const incidents = readIncidentsFromFile();

    // Send the list of incidents as a response
    res.status(200).json(incidents);
  } catch (error) {
    // Handle errors and send a 500 status code with an error message
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve incidents', error });
  }
};

module.exports = {
  reportIncident,
  getIncidents,
};
