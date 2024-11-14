// import and instantiate express
import express from 'express'
const router = express.Router();
import users from '../mock-data/users.js'

router.post("/api/deactivate", async (req, res) => {
    const id = req.body.id
    let userList = users

    try {
        // dropping user from user database
        userList = userList.filter(user => user.id !== id);

        res.status(200).send('User deactivated')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to deactivate' });
    }
});

export default router