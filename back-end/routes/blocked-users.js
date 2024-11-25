// import and instantiate express
import express from 'express'
const router = express.Router();
import Setting from "../models/setting.model.js";
import User from "../models/user.model.js";
import { protectRouter } from "../middlewares/auth.middleware.js";

// blocked users
router.get("/api/blocked-users", protectRouter, async (req, res) => {
    // getting user id from cookies
    const id = req.user._id

    try {
        const user = await Setting.findOne({ userId: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const blockedUserData = user.blockedUsers;

        res.json(blockedUserData);
    } catch (error) {
        res.status(500).json({ error: "Could not get data." })
    }
});

// unblock user
router.post("/api/blocked-users", protectRouter, async (req, res) => {
    const request = req.body.request

    // getting user id from cookies
    const id = req.user._id

    if (request === 'unblock') {
        try {
            const userId = req.body.id;

            // check if unblocked user exists
            const unblockUser = await User.findOne({ username: userId });

            if (!unblockUser) {
                return res.status(404).json({ message: "User not found" });
            }

            await Setting.updateOne({ userId: id }, { $pull: { blockedUsers: { username: userId } } });

            // fetch updated info
            const updatedUser = await Setting.findOne({ userId: id });
            const updatedBlockedUserData = updatedUser.blockedUsers

            res.status(200).json(updatedBlockedUserData)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to unblock user' });
        }
    }
    else if (request === 'block') {
        try {
            // check if user to block exists
            const name = req.body.user
            const blockUser = await User.findOne({ username: name });

            if (!blockUser) {
                return res.status(404).json({ message: "User not found" });
            }

            // update blocked user data
            const user = await Setting.findOne({ userId: id });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const blockedUserData = user.blockedUsers;

            // preventing duplicates
            const userInList = blockedUserData.find(u => u.username === name);

            if (userInList) {
                return res.status(200).json({
                    users: blockedUserData,
                    message: "You have already blocked this user.",
                });
            }

            // update database
            await Setting.findOneAndUpdate({ userId: id }, { $push: { blockedUsers: { userId: blockUser, username: name } } });

            // retrieve updated information
            const updatedUser = await Setting.findOne({ userId: id });
            const updatedBlockedUserData = updatedUser.blockedUsers;

            res.status(200).json({ users: updatedBlockedUserData, message: "Blocked user successfully!" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to unblock user' });
        }
    }
});

export default router;