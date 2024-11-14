#!/usr/bin/env node

/**
 * @module server
 * @description Initializes and starts the web server.
 */

require('dotenv').config();  // Load environment variables from .env

const server = require('./app'); // load the web server

const port = process.env.PORT || 3001; // the port to listen to for incoming requests

/**
 * Starts the server and listens on the specified port.
 * @function
 * @returns {http.Server} The server instance.
 */
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`);
});

/**
 * Stops the server from listening to the port.
 * @function
 * @returns {void}
 */
const close = () => {
  listener.close();
};

module.exports = {
  close: close,
};
