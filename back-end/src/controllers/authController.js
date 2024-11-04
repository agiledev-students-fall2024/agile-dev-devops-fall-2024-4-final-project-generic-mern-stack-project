/**
 * @module authController
 */
// const User = require('../models/User'); // Example model import

let users = []; 

/**
 * Logs in a user.
 * @function login
 * @param {Object} req - Request object with user credentials.
 * @param {Object} res - Response object for sending the response.
 */
const login = async (req, res) => {
  const { email, password } = req.body

  //Validate Input 
  const user = users.find(u => u.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', user });
};

/**
 * Signs up a new user.
 * @function signup
 * @param {Object} req - Request object with user registration data.
 * @param {Object} res - Response object for sending the response.
 */
const signup = async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  if (users.some(u => u.email === email)) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // Create a new user and save it to the in-memory array
  const newUser = { email, password };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
};

module.exports = {
  login,
  signup,
};
