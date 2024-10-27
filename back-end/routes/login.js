// routes/login.js
const express = require('express');
const User = require('../models/user'); 
const jwt = require('jsonwebtoken');

const router = express.Router();
const USER_SECRET = 'test_jwt_secret'; 

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    console.log("come into login, generate token, user:",req.body, username, password);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, USER_SECRET, { expiresIn: '24h' });
    res.json({ token });
});

module.exports = router;
