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

export default router