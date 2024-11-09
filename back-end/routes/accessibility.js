// import and instantiate express
import express from 'express'
const router = express.Router();

router.get("/api/color-mode", async (req, res) => {
    // get user's current color-mode
    console.log('color mode')
});

router.post("/api/color-mode", async (req, res) => {
    // change user's current color-mode
    try {
        console.log(req.body)
        res.status(200).json(req.body.color)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to change color mode' });
    }
});

router.get("/api/image-mode", async (req, res) => {
    // get user's current image mode
    console.log('image mode')
});

router.post("/api/image-mode", async (req, res) => {
    // change user's current image mode
    try {
        console.log(req.body)
        res.status(200).json(req.body.image)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to change image mode' });
    }
});

router.post("/api/font-size", async (req, res) => {
    // change user's current font size
    try {
        console.log(req.body)
        res.status(200).json(req.body.fontSize)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to change font size' });
    }
});

export default router