const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authController');

/**
 * @route POST /api/auth/login
 * @description Handles user login by verifying credentials.
 */
router.post('/login', login);

/**
 * @route POST /api/auth/signup
 * @description Registers a new user account.
 */
router.post('/signup', signup);

module.exports = router;
