// import and instantiate express
import express from 'express'
const router = express.Router();

// blocked users
router.get("/api/blocked-users", async (req, res) => {
    const users = [{
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

    try {
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Could not get data." })
    }
});

// unblock user
router.post("/api/blocked-users", async (req, res) => {
    const userId = req.body.id;
    let users = req.body.users;

    try {
        users = users.filter(user => user.id !== userId);

        res.status(200).json(users)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to unblock user' });
    }
});

// blocked communities
router.get("/api/blocked-communities", async (req, res) => {
    const communities = [{
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

    try {
        res.json(communities);
    } catch (error) {
        res.status(500).json({ error: "Could not get data." })
    }
});

// unblock community
router.post("/api/blocked-communities", async (req, res) => {
    const communityId = req.body.id;
    let communities = req.body.communities;

    try {
        communities = communities.filter(community => community.id !== communityId);

        res.status(200).json(communities)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to unblock community' });
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

// unmute words
router.post("/api/muted-words", async (req, res) => {
    const wordId = req.body.id;
    let words = req.body.words;

    try {
        words = words.filter(word => word.id !== wordId);

        res.status(200).json(words)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to unblock community' });
    }
});

export default router