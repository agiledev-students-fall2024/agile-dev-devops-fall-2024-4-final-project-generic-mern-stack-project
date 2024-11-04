/**
 * @module authController
 */
const User = require('../models/User');

const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');

/**
 * Reads users from the JSON file.
 * @returns {Promise<Object[]>} - A promise that resolves to the array of users.
 */
const readUsers = () => {
  const usersData = fs.readFileSync(usersPath);
  return JSON.parse(usersData);
};

/**
 * Writes users to the JSON file.
 * @param {Object[]} users - An array of user objects to be saved.
 * @returns {Promise<void>} - A promise that resolves when the write is complete.
 */
const writeUsers = (users) => {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
};

/**
 * Signs up a new user.
 * @function signup
 * @param {Object} req - Request object with user registration data.
 * @param {Object} res - Response object for sending the response.
 */
const signup = async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  // Create a new User instance
  const newUser = new User(email, password);

   // Validate user data
  const validationErrors = User.validate(newUser);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  // Check if user already exists
  if (users.some(u => u.email === newUser.email)) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // Save the new user
  users.push(newUser);
  writeUsers(users);
  
  res.status(201).json({ message: 'User registered successfully' });
};


/**
 * Logs in a user.
 * @function login
 * @param {Object} req - Request object with user credentials.
 * @param {Object} res - Response object for sending the response.
 */
const login = async (req, res) => {
  const { email, password } = req.body
  const users = readUsers();

  //Validate Input 
  const user = users.find(u => u.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', user });
};

module.exports = {
  login,
  signup,
};
