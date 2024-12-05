import express from 'express';
import bcrypt from 'bcrypt';
import User from './models/User.js'; // User model
 
const router = express.Router();
 
import jwt from 'jsonwebtoken'; //for JWT generato
import { authenticateToken } from './middleware/auth.js';
 
/* ======================= Sign-Up Route ======================= */
router.post('/signup', async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  try {
    // Validate required fields
    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
 
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
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
});
 
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
router.put('/:id/update', async (req, res) => {
  const { first_name, last_name, username, email, profilePicture, password } =
    req.body;
 
  try {
    console.log('Updating user with ID:', req.params.id);
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
 
    if (last_name) user.lastName = last_name;
    if (first_name) user.firstName = first_name;
    if (username) user.username = username;
    if (email) user.email = email;
    if (profilePicture) user.profilePicture = profilePicture;
    //if (password) user.password = await bcrypt.hash(password, 10);
    //password will be hashed in pre_saving in file /modle/User.js
    if (password) user.password = password;
 
    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 
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