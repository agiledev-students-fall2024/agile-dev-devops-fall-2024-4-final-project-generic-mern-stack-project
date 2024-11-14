// import and instantiate express
import express from 'express'
const router = express.Router();
import blockedCommunityData from '../mock-data/blocked-communities.js'

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

            // preventing duplicates
            const commInList = communities.find(c => c.community === name);

            if (commInList) {
                return res.status(200).json({
                    communities: communities,
                    message: "You have already blocked this commmunity.",
                });
            }

            const newCommunity = {
                id: lastId + 1,
                community: name
            }
            communities.push(newCommunity)

            blockedCommunityData.length = 0;
            blockedCommunityData.push(...communities);

            res.status(200).json({ communities: communities, message: "Blocked community successfully!" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to unblock community' });
        }
    }
});

export default router;