// import and instantiate express
import express from 'express'
import User from "../models/user.model.js";

const router = express.Router();

// account settings
router.get("/api/account-settings", async (req, res) => {
    try {
        // replace with getting user id from cookies
        const userId = '673cdeb5715f8dab635dbbed'

        const user = await User.findById(userId);
        if (!user) {
            return { message: "User not found" };
        }

        const name = user.name;
        const username = user.username;
        const email = user.email;
        const password = user.password;

        const data = {
            "id": userId,
            "username": username,
            "name": name,
            "email": email,
            "password": password
        }

        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Could not get data" })
    }
});

export default router