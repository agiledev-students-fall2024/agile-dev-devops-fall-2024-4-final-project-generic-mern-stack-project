// import and instantiate express
import express from 'express'
const router = express.Router();

// blocked users
router.get("/api/blocked-users", async (req, res) => {
    try {
        const data = [{
            "id": 1,
            "username": "van_gogh"
        }, {
            "id": 2,
            "username": "picasso"
        }, {
            "id": 3,
            "username": "frida_khalo"
        }, {
            "id": 4,
            "username": "dali"
        }, {
            "id": 5,
            "username": "claude_monet"
        }, {
            "id": 6,
            "username": "raphael"
        }, {
            "id": 7,
            "username": "leonardo"
        }]

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Could not get data." })
    }
});

// blocked communities
router.get("/api/blocked-communities", async (req, res) => {
    try {
        const data = [{
            "id": 1,
            "community": "Renaissance Artists"
        }, {
            "id": 2,
            "community": "Modernism"
        }, {
            "id": 3,
            "community": "Baroque Artists"
        }, {
            "id": 4,
            "community": "Abstract Artists"
        }, {
            "id": 5,
            "community": "Impressionism Group"
        }, {
            "id": 6,
            "community": "Sculpting"
        }, {
            "id": 7,
            "community": "Beginner Artists"
        }]

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Could not get data." })
    }
});

// muted words
router.get("/api/muted-words", async (req, res) => {
    try {
        const data = [{
            "id": 1,
            "muted_word": "politics"
        }, {
            "id": 2,
            "muted_word": "computer science"
        }, {
            "id": 3,
            "muted_word": "homework"
        }, {
            "id": 4,
            "muted_word": "school"
        }, {
            "id": 5,
            "muted_word": "spiders"
        }, {
            "id": 6,
            "muted_word": "Javascript"
        }]

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Could not get data." })
    }
});

export default router