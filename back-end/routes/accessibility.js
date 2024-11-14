// import and instantiate express
import express from 'express'
const router = express.Router();
import colors from '../mock-data/color-mode.js'
import images from '../mock-data/image-mode.js'
import font from '../mock-data/font-size.js'

router.get("/api/color-mode", async (req, res) => {
    // get user's current color-mode
    try {
        const color = colors.filter(user => user.id === 1);

        res.status(200).json(color[0].mode)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get color mode' });
    }
});

router.post("/api/color-mode", async (req, res) => {
    // change user's current color-mode
    try {
        const id = req.body.id
        const color = req.body.color
        colors.forEach((elem) => {
            if (elem.id === id) {
                elem.mode = color
            }
        })

        res.status(200).json(color)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to change color mode' });
    }
});

router.get("/api/image-mode", async (req, res) => {
    // get user's current image mode
    try {
        const image = images.filter(user => user.id === 1);

        res.status(200).json(image[0].mode)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get image mode' });
    }
});

router.post("/api/image-mode", async (req, res) => {
    // change user's current image mode
    try {
        const id = req.body.id
        const image = req.body.image
        images.forEach((elem) => {
            if (elem.id === id) {
                elem.mode = image
            }
        })

        res.status(200).json(image)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to change image mode' });
    }
});

router.get("/api/font-size", async (req, res) => {
    // get user's current font size
    try {
        const size = font.filter(user => user.id === 1);

        res.status(200).json(size[0].font)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get font size' });
    }
});

router.post("/api/font-size", async (req, res) => {
    // change user's current font size
    try {
        const id = req.body.id
        const size = req.body.fontSize

        font.forEach((elem) => {
            if (elem.id === id) {
                elem.mode = size
            }
        })

        res.status(200).json(size)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to change font size' });
    }
});

export default router