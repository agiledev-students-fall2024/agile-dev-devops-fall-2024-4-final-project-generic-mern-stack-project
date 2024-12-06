import express from 'express';
import bcrypt from 'bcrypt';
import User from './models/User.js'; // User model
import { body, validationResult } from 'express-validator';
 
const router = express.Router();
 
import jwt from 'jsonwebtoken'; //for JWT generato
import { authenticateToken } from './middleware/auth.js';
 
/* ======================= Sign-Up Route ======================= */
router.post(
  '/signup',
  [
    // Validation rules
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('username')
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 
    const { firstName, lastName, username, email, password } = req.body;
    try {
      // Validate required fields
      if (!firstName || !lastName || !username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
 
      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: 'Username or email already in use.' });
      }
 
      // Create and save the new user
      const newUser = new User({
        firstName,
        lastName,
        username,
        email,
        password,
      });
 
      await newUser.save();
      console.log('Signup Plaintext Password:', password);
      //console.log('Signup Hashed Password:', hashedPassword);
      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
 
// GET route to retrieve user details
//router.get('/:id', async (req, res) => {
//  try {
//    console.log('Fetching user details for ID:', req.params.id);
//    const user = await User.findById(req.params.id);
//    if (!user) return res.status(404).json({ message: 'User not found' });
//
//    res.status(200).json({
//      username: user.username,
//      email: user.email,
//      profilePicture: user.profilePicture,
//    });
//  } catch (error) {
//    res.status(500).json({ message: error.message });
//  }
//});
 
// POST route to update user details
router.put(
  '/:id/update',
  async (req, res, next) => {
    const { first_name, last_name, username, email, password } = req.body;
 
    // Dynamically create validation rules for the fields that exist in the request body
    const validations = [];
 
    if (first_name !== undefined) {
      validations.push(
        body('first_name').notEmpty().withMessage('First name is required')
      );
    }
    if (last_name !== undefined) {
      validations.push(
        body('last_name').notEmpty().withMessage('Last name is required')
      );
    }
    if (username !== undefined) {
      validations.push(
        body('username')
          .notEmpty()
          .withMessage('Username is required')
          .isLength({ min: 3 })
          .withMessage('Username must be at least 3 characters long')
      );
    }
    if (email !== undefined) {
      validations.push(
        body('email').isEmail().withMessage('Invalid email address')
      );
    }
    if (password !== undefined) {
      validations.push(
        body('password')
          .isLength({ min: 6 })
          .withMessage('Password must be at least 6 characters long')
      );
    }
 
    // Run the validation rules
    await Promise.all(validations.map((validation) => validation.run(req)));
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 
    next();
  },
  async (req, res) => {
    const { first_name, last_name, username, email, profilePicture, password } =
      req.body;
 
    try {
      console.log('Updating user with ID:', req.params.id);
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
 
      // Update only the fields that are provided
      if (last_name !== undefined) user.lastName = last_name;
      if (first_name !== undefined) user.firstName = first_name;
      if (username !== undefined) user.username = username;
      if (email !== undefined) user.email = email;
      if (profilePicture !== undefined) user.profilePicture = profilePicture;
      if (password !== undefined) user.password = password;
 
      await user.save();
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
// POST route for login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
 
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
 
    // Compare provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
 
    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });
    console.log('Authenticated token:', token); // Log user info set in middleware
    // Respond with the token and user details
    res.status(200).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 
// GET route to retrieve user details (protected)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching user details for ID:', req.params.id);
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
 
    res.status(200).json({
      first_name: user.firstName,
      last_name: user.lastName,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 
//test protected route
router.get('/protected', authenticateToken, (req, res) => {
  res.json({
    message: 'You have access to this protected route!',
    user: req.user,
  });
});
 
// POST route to log out a user
router.post('/logout', (req, res) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }
 
  tokenBlacklist.push(token);
  res.status(200).json({ message: 'Successfully logged out' });
});
 
// Middleware to check for blacklisted tokens
const isTokenBlacklisted = (req, res, next) => {
  const token = req.header('Authorization');
  if (tokenBlacklist.includes(token)) {
    return res
      .status(401)
      .json({ message: 'Token is blacklisted. Please log in again.' });
  }
  next();
};
 
export default router;