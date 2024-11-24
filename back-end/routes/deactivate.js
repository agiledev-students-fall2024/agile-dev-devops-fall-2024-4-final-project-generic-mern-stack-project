// import and instantiate express
import express from 'express'
const router = express.Router();
import User from "../models/user.model.js";
import Setting from "../models/setting.model.js";

router.post("/api/deactivate", async (req, res) => {
    try {
        // const id = req.body.id
        const id = '6740c351fdcb802f3f7ec5e7'

        const user = await Setting.findOne({ userId: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // dropping user from user database
        // await User.findOneAndRemove({ userId: id })
        // await Setting.findOneAndRemove({ userId: id })

        res.status(200).send('User deactivated')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to deactivate' });
    }
});

export default router