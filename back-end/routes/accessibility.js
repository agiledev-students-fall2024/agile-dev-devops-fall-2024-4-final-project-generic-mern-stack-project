// import and instantiate express
import express from 'express'
const router = express.Router();
import Setting from "../models/setting.model.js";

router.get("/api/color-mode", async (req, res) => {
    // get user's current color-mode
    try {
        // replace with getting user id from cookies
        const id = '6740c351fdcb802f3f7ec5e7'

        const user = await Setting.findOne({ userId: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const color = user.displayMode;

        res.status(200).json(color)
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
        // replace with getting user id from cookies
        const id = '6740c351fdcb802f3f7ec5e7'

        const user = await Setting.findOne({ userId: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const image = user.imagePreference;

        res.status(200).json(image)
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
        // replace with getting user id from cookies
        const id = '6740c351fdcb802f3f7ec5e7'

        const user = await Setting.findOne({ userId: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const font = user.fontSize;

        res.status(200).json(font)
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