const express = require('express') 
const router = express.Router()
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator')
const User = require('../models/User.js')

router.post('/register', 
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required.')
      .isLength({ min:1, max: 50 })
      .withMessage('Name must be between 1 and 50 characters.'),
    body('username')
      .notEmpty()
      .withMessage('Username is required.')
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be between 3 and 30 characters.')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username can only contain letters, numbers, and underscores.'),
    body('email')
      .notEmpty()
      .withMessage('Email is required.')
      .isEmail()
      .withMessage('Please enter a valid email address.'),
    body('password')
      .notEmpty()
      .withMessage('Password is required.')
      .isLength({ min: 4 })
      .withMessage('Password must be at least 4 characters.'),
    body('confirm')
      .notEmpty()
      .withMessage('Confirm Password is required.')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Confirm Password must match Password.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        message: errors.array()[0].msg 
      })
    }

    const { name, username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username or email already exists.',
        })
      }

      const user = await new User({ name, username, email, password }).save()
      const token = user.generateJWT()

      return res.json({
        success: true,
        message: 'User saved successfully.',
        token: token,
        username: user.username,
      })
    } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Error saving user to database.',
          error: err,
        })
    }
  }
)

router.post('/login', 
  [
    body('username')
      .notEmpty()
      .withMessage('Username is required.'),
    body('password')
      .notEmpty()
      .withMessage('Password is required.')
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        message: errors.array()[0].msg 
      })
    }
    const {username, password} = req.body

    try {
      const user = await User.findOne({ username: username }).exec()
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User does not exist.',
        })
      }

      else if (!user.validPassword(password)) {
        return res.status(401).json({
          success: false,
          message: 'Incorrect password.',
        })
      }

      const token = user.generateJWT()
      return res.status(200).json({
        success: true,
        message: 'User logged in successfully.',
        token: token,
        username: user.username,
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Error looking up user in database.',
        error: err,
      })
    }
  }
)

router.get('/logout', function (req, res) {
  return res.json({
    success: true,
    message: "Delete token from the browser's local storage!",
  })
})

module.exports = router
