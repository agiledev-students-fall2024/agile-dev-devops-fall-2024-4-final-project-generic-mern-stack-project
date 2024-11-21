const express = require('express') 
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User.js')

router.post('/register', async (req, res) => {
  // console.log(`Incoming signup data: ${JSON.stringify(req.body, null, 0)}`)
  const { name, username, email, password, confirm } = req.body;

  if (!name || !username || !email || !password  || !confirm) {
    return res.status(401).json({
      success: false,
      message: 'No username or password supplied.',
    })
  }
  
  if (password !== confirm) {
    return res.status(401).json({
      success: false,
      message: 'Passwords must match.',
    })
  }

  try {
    const user = await new User({ name, username, email, password }).save()
    // console.log(`New user: ${user}`)

    const token = user.generateJWT() // generate a signed token

    return res.json({
      success: true,
      message: 'User saved successfully.',
      token: token,
      username: user.username,
    })
  } catch (err) {
      // console.error(`Failed to save user: ${err}`)
      return res.status(500).json({
        success: false,
        message: 'Error saving user to database.',
        error: err,
      })
  }
})

router.post('/login', async function (req, res) {
  const username = req.body.username
  const password = req.body.password
  // console.log(`${username}, ${password}`)

  if (!username || !password) {
    return res
      .status(401)
      .json({ success: false, message: `No username or password supplied.` })
    
  }

  try {
    const user = await User.findOne({ username: username }).exec()
    if (!user) {
      // console.error(`User not found.`)

      return res.status(401).json({
        success: false,
        message: 'User does not exist.',
      })
    }

    else if (!user.validPassword(password)) {
      // console.error(`Incorrect password.`)
      return res.status(401).json({
        success: false,
        message: 'Incorrect password.',
      })
    }

    // console.log('User logged in successfully.')
    const token = user.generateJWT()
    return res.status(200).json({
      success: true,
      message: 'User logged in successfully.',
      token: token,
      username: user.username,
    })
  } catch (err) {
    // console.error(`Error looking up user: ${err}`)
    return res.status(500).json({
      success: false,
      message: 'Error looking up user in database.',
      error: err,
    })
  }
})

router.get('/logout', function (req, res) {
  return res.json({
    success: true,
    message:
      "Delete token from the browser's local storage!",
  })
})

module.exports = router
