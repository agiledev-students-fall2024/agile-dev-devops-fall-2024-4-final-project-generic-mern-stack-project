// import and instantiate express
import express from 'express'
const router = express.Router();
import blockedUserData from '../mock-data/blocked-users.js'
import blockedCommunityData from '../mock-data/blocked-communities.js'
import mutedWordData from '../mock-data/muted-words.js'

// blocked users
router.get("/api/blocked-users", async (req, res) => {
    const users = []

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

            // with a database, we'd check if the user exists before blocking
            // const users = users.find(u => u.username === name);

            // preventing duplicates
            const userInList = users.find(u => u.username === name);

            if (!userInList) {
                const newUser = {
                    id: lastId + 1,
                    username: name
                }
                users.push(newUser)
            }

            blockedUserData.length = 0;
            blockedUserData.push(...users);

            console.log(blockedUserData)
            res.status(200).json(users)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to unblock user' });
        }
    }
});

// blocked communities
router.get("/api/blocked-communities", async (req, res) => {
    const communities = []

    // read data in from file
    blockedCommunityData.forEach(x => {
        communities.push(x)
    })

    try {
        res.json(communities);
    } catch (error) {
        res.status(500).json({ error: "Could not get data." })
    }
});

// unblock community
router.post("/api/blocked-communities", async (req, res) => {
    const request = req.body.request
    let communities = req.body.communities;

    if (request === 'unblock') {
        try {
            const communityId = req.body.id;
            communities = communities.filter(community => community.id !== communityId);

            blockedCommunityData.length = 0;
            blockedCommunityData.push(...communities);

            res.status(200).json(communities)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to unblock community' });
        }
    }
    else if (request === 'block') {
        try {
            const name = req.body.name
            const lastId = blockedCommunityData.length ? blockedCommunityData[blockedCommunityData.length - 1].id : 0;

            // with a database, we'd check if the community exists before blocking
            // const communityExists = communities.find(c => c.community === name);

            // preventing duplicates
            const commInList = communities.find(c => c.community === name);

            if (!commInList) {
                const newCommunity = {
                    id: lastId + 1,
                    community: name
                }
                communities.push(newCommunity)
            }

            blockedCommunityData.length = 0;
            blockedCommunityData.push(...communities);

            console.log(blockedCommunityData)
            res.status(200).json(communities)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to unblock community' });
        }
    }
});

// muted words
router.get("/api/muted-words", async (req, res) => {
    const words = []

    // read data in from file
    mutedWordData.forEach(x => {
        words.push(x)
    })

    try {
        res.json(words);
    } catch (error) {
        res.status(500).json({ error: "Could not get data." })
    }
});

// mute and unmute words
router.post("/api/muted-words", async (req, res) => {
    const request = req.body.request
    let words = req.body.words;

    if (request === 'unmute') {
        const wordId = req.body.id;

        try {
            words = words.filter(word => word.id !== wordId);

            mutedWordData.length = 0;
            mutedWordData.push(...words);
            console.log(mutedWordData)

            res.status(200).json(words)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to unblock community' });
        }
    }
    else if (request === 'mute') {
        const word = req.body.word;
        const lastId = mutedWordData.length ? mutedWordData[mutedWordData.length - 1].id : 0;

        try {
            // preventing duplicates
            const wordInList = words.find(w => w.muted_word === word);

            if (!wordInList) {
                const newWord = {
                    id: lastId + 1,
                    muted_word: word
                }
                console.log(wordInList)
                words.push(newWord)
            }

            mutedWordData.length = 0;
            mutedWordData.push(...words);

            console.log(mutedWordData)

            res.status(200).json(mutedWordData)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to mute word' });
        }
    }
});

export default router;