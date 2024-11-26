//import and instantiate express
import express from "express"
import Community from "../models/community.model.js";

const router = express.Router();

//subcommunity - sends back a specific community group data after clicking the group
router.get('/api/community/:communityId', async (req, res) => {
    try {
        //find community from database
        const community = await Community.findById(req.params.communityId)
        //console.log(community)

        //validate the community 
        if (!community){
            return res.status(404)({
                message: "community not found"
            })
        }

        //add data about the community to send back
        const subcommunity = {
            id: community._id.toString(),
            name: community.name,
            description: community.description,
            communityPicture: community.communityPicture || '/uploads/community/default_pic.png'
        }

        res.status(200).json(subcommunity)

    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: err,
            status: "failed to get subcommunity data from back-end"
        })
    }
})

export default router