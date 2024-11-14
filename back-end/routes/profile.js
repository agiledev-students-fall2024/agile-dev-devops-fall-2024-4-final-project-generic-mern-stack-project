// import and instantiate express
import express from 'express'
import { user } from './auth.js';
const router = express.Router();

// route for the profile page
router.get('/api/profile', async (req, res) => {
    // get the data for the user
    try {
        res.json(user)
    } catch(error) {
        console.error("Error in getting profile information", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// route to update user profile
router.post('/api/profile', async (req, res) => {
    const { display_name, username, about, email, profile_pic } = req.body;
    user.display_name = display_name;
    user.username = username;
    user.about = about;
    user.email = email;
    user.profile_pic = profile_pic;

    res.status(200).json({ message: "Profile updated successfully", user });
  });

export default router