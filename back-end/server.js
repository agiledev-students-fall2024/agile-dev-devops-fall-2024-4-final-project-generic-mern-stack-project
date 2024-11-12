#!/usr/bin/env node

require('./config.js');
const server = require("./app"); // Load up the web server
const port = process.env.PORT; // The port to listen to for incoming requests

// Start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`);
});

// A function to stop listening to the port
const close = () => {
  listener.close();
};

// Use named exports
module.exports = { server, close };