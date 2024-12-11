const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Find user by username or email
        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
});

// Register Route
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || password !== confirmPassword) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Create and save a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Registration successful', userId: newUser._id });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Middleware for protecting routes
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
};

module.exports = router;
module.exports.authenticateToken = authenticateToken;
