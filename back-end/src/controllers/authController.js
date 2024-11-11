/**
 * @module authController
 */
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');  // To validate email format

/**
 * Validate user input
 * @function validateUser
 * @param {Object} user - The user input object with email and password.
 * @returns {Array} A list of error messages if any validation fails.
 */
const validateUser = ({ email, password }) => {
  const errors = [];
  if (!validator.isEmail(email)) {
    errors.push('Invalid email format');
  }

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  return errors;
};

/**
 * Signs up a new user.
 * @function signup
 * @param {Object} req - Request object with user registration data.
 * @param {Object} res - Response object for sending the response.
 */
const signup = async (req, res) => {
  const { email, password } = req.body;

  // Validate user input
  const validationErrors = validateUser({ email, password });
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User document in MongoDB
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Logs in a user.
 * @function login
 * @param {Object} req - Request object with user credentials.
 * @param {Object} res - Response object for sending the response.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate user input
  const validationErrors = validateUser({ email, password });
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      user: { email: user.email, token },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  signup,
  login,
};
