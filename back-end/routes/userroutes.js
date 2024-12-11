const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get user settings by username
router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            username: user.username,
            aboutMe: user.aboutMe,
            number: user.number,
            otherSocialMedia: user.otherSocialMedia,
            friendsList: user.friendsList,
            profilePhoto: user.profilePhoto
        });
    } catch (error) {
        console.error('Error fetching user settings:', error);
        res.status(500).json({ error: 'Failed to fetch user settings' });
    }
});

router.put('/:username', async (req, res) => {
  const { username } = req.params;
  const { aboutMe, number, otherSocialMedia, friendsList, profilePhoto } = req.body;

  console.log(`Received PUT request for username: ${username}`); // Debug
  console.log('Request body:', req.body); // Debug to check incoming data

  try {
      const user = await User.findOne({ username });
      if (!user) {
          console.log(`User not found: ${username}`); // Debug
          return res.status(404).json({ error: 'User not found' });
      }

      // Update user fields
      user.aboutMe = aboutMe || user.aboutMe;
      user.number = number || user.number;
      user.otherSocialMedia = otherSocialMedia || user.otherSocialMedia;
      user.friendsList = friendsList || user.friendsList;
      user.profilePhoto = profilePhoto || user.profilePhoto;

      console.log('Updated user before saving:', user); // Debug

      await user.save(); // Save updated user to database

      res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
      console.error('Error updating user:', error); // Debug
      res.status(500).json({ error: 'Failed to update user settings' });
  }
});


module.exports = router;
