import express from "express";
import User from "../models/user.model.js";
import Community from "../models/community.model.js";
import { protectRouter } from "../middlewares/auth.middleware.js";

const router = express.Router();

const joinCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.user._id;

    // find user by id
    const user = await User.findById(userId);
    // find community by id
    const community = await Community.findById(communityId);

    if (
      user.communities.includes(community.communityId) ||
      community.members.includes(userId)
    ) {
      return res.status(400).json({
        message: "You have already joined this community",
      });
    }
    user.communities.push(community.communityId);
    community.members.push(userId);
    // todo: save user and community
    res.status(200).json({
      message: "You have successfully joined the community",
      user,
      community,
    });
  } catch (error) {
    console.error("Error in joinCommunity", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

router.post("/api/join-community/:communityId", protectRouter, joinCommunity);
export default router;
