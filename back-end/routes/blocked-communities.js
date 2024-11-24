// import and instantiate express
import express from 'express'
const router = express.Router();
import Setting from "../models/setting.model.js";
import Community from '../models/community.model.js';

// blocked communities
router.get("/api/blocked-communities", async (req, res) => {
    // replace with getting user id from cookies
    const id = '6740c351fdcb802f3f7ec5e7'

    const user = await Setting.findOne({ userId: id });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const blockedCommunityData = user.blockedCommunities;

    try {
        res.json(blockedCommunityData);
    } catch (error) {
        res.status(500).json({ error: "Could not get data." })
    }
});

// unblock community
router.post("/api/blocked-communities", async (req, res) => {
    const request = req.body.request

    // replace with getting user id from cookies
    const id = '6740c351fdcb802f3f7ec5e7'

    if (request === 'unblock') {
        try {
            const communityName = req.body.name;

            // check if unblocked user exists
            const unblockCommunity = await Community.findOne({ name: communityName });

            if (!unblockCommunity) {
                return res.status(404).json({ message: "Community not found" });
            }

            // update blocked community data
            await Setting.updateOne({ userId: id }, { $pull: { blockedCommunities: { name: communityName } } });

            // fetch updated information
            const user = await Setting.findOne({ userId: id });
            const blockedCommunityData = user.blockedCommunities;

            res.status(200).json(blockedCommunityData)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to unblock community' });
        }
    }
    else if (request === 'block') {
        try {
            const communityId = req.body.name;

            // check if community exists
            const community = await Community.findOne({ name: communityId });
            if (!community) {
                return res.status(404).json({ message: "Community not found" });
            }

            // find user and get current blocked community data
            const user = await Setting.findOne({ userId: id });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const blockedCommunityData = user.blockedCommunities;

            // preventing duplicates
            const commInList = blockedCommunityData.find(c => c.community === community);

            if (commInList) {
                return res.status(200).json({
                    communities: blockedCommunityData,
                    message: "You have already blocked this commmunity.",
                });
            }

            // update community data
            await Setting.findOneAndUpdate({ userId: id }, { $push: { blockedCommunities: { cid: community, name: communityId } } });

            // fetch updated information
            const updatedUser = await Setting.findOne({ userId: id });
            const updatedBlockedCommunityData = updatedUser.blockedCommunities;

            res.status(200).json({ communities: updatedBlockedCommunityData, message: "Blocked community successfully!" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to unblock community' });
        }
    }
});

export default router;