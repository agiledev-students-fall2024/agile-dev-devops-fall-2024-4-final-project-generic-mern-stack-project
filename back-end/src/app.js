// Import required modules
require('dotenv').config(); // import .env variables
const express = require('express');
const morgan = require('morgan'); // middleware for logging HTTP requests

/**
 * @module app
 * @description Express application setup and route management.
 */

const app = express(); // instantiate an Express object

// Import Routes
const authRoutes = require('./routes/auth'); // routes for authentication
const userRoutes = require('./routes/users'); // routes for user specific data
const incidentRoutes = require('./routes/incidents'); // routes for incidents

// Use Middleware
app.use(morgan('dev')); // dev style gives a concise color-coded style of log output
app.use(express.json()); // middleware to parse JSON requests

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/incidents', incidentRoutes);

/**
 * Route for HTTP GET requests to the root document.
 * @function
 * @name getRoot
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.get('/', (req, res) => {
  res.send('Goodbye world!');
});

// export the express app we created to make it available to other modules
module.exports = app;
