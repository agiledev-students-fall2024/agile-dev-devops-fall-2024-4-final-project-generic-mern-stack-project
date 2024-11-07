// import and instantiate express
import express from 'express'
const router = express.Router();

// account settings
router.get("/api/account-settings", async (req, res) => {
    try {
        const data = {
            id: 1,
            username: 'monalisa',
            name: 'Mona Lisa',
            email: 'monalisa123@gmail.com',
            password: 'monalisa123!'
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Could not get data" })
    }
});

export default router