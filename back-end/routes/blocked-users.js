// import and instantiate express
import express from 'express'
const router = express.Router();
import Setting from "../models/setting.model.js";

// blocked users
router.get("/api/blocked-users", async (req, res) => {
    const users = []

    // replace with getting user id from cookies
    const id = '6740c351fdcb802f3f7ec5e7'

    const user = await Setting.findOne({ userId: id });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const blockedUserData = user.blockedUsers;

    // read data in from file
    blockedUserData.forEach(x => {
        users.push(x)
    })

    try {
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Could not get data." })
    }
});

// unblock user
router.post("/api/blocked-users", async (req, res) => {
    const request = req.body.request
    let users = req.body.users;

    if (request === 'unblock') {
        const userId = req.body.id;

        try {
            users = users.filter(user => user.id !== userId);

            blockedUserData.length = 0;
            blockedUserData.push(...users);

            res.status(200).json(users)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to unblock user' });
        }
    }
    else if (request === 'block') {
        try {
            const name = req.body.user
            const lastId = blockedUserData.length ? blockedUserData[blockedUserData.length - 1].id : 0;

            // preventing duplicates
            const userInList = users.find(u => u.username === name);

            if (userInList) {
                return res.status(200).json({
                    users: users,
                    message: "You have already blocked this user.",
                });
            }

            const newUser = {
                id: lastId + 1,
                username: name
            }
            users.push(newUser)

            blockedUserData.length = 0;
            blockedUserData.push(...users);

            res.status(200).json({ users: users, message: "Blocked user successfully!" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to unblock user' });
        }
    }
});

export default router;