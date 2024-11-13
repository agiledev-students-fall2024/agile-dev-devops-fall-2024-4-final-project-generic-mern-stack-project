const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  
  const { name, email, password, occupation, studying } = req.body;
  username = name;
  console.log("DBG: user registration: ");
  console.log(req.body);

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('Error hashing password');
    }

    const user = new User({ 
      username,
      email,
      password: hashedPassword,  
      occupation, 
      studying
    });
    
    user.save()
    .then(() => res.status(201).send('User registered successfully'))
    .catch(err => res.status(500).send('Error saving user to database'));
  });

});


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const hashedPassword = password;  //TODO
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        password: hashedPassword !== undefined ? hashedPassword : undefined,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
