import express from 'express';
import fs from 'fs';

const router = express.Router();
const locations = JSON.parse(fs.readFileSync('./mock-data/locations.json', 'utf-8'));

// TODO: Get all locations (GET) - Retrieve and respond with a list of all locations, including basic details


// TODO: Get a specific location by ID (GET) - Retrieve details for the specified location, including any associated activities


// TODO: Create a new location (POST) - Add a new location to a trip and respond with the newly created location data


// TODO: Update location information (PUT) - Modify location data and respond with the updated location information


// TODO: Delete a location (DELETE) - Remove the specified location and respond with a confirmation message

export default router;
