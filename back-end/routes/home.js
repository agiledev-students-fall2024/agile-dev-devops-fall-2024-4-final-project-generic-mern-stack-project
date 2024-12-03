import express from "express";
import { protectRouter } from "../middlewares/auth.middleware.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Setting from "../models/setting.model.js";

const router = express.Router();

router.get("/api/home", protectRouter, async (req, res) => {
  try {
    const userId = req.user._id;
    const { communityId } = req.query;

    let posts;

    if (communityId) {
      posts = await Post.find({ community: communityId })
        .populate("madeBy", "username name profilePicture")
        .populate("community", "name")
        .populate({
          path: "replies",
          populate: { path: "madeBy", select: "username name profilePicture" },
        })
        .sort({ createdAt: -1 });
    } else {
      const user = await User.findById(userId).populate("communities");
      const communityIds = user.communities.map((c) => c._id);

      posts = await Post.find({ community: { $in: communityIds } })
        .populate("madeBy", "username name profilePicture")
        .populate("community", "name")
        .populate({
          path: "replies",
          populate: { path: "madeBy", select: "username name profilePicture" },
        })
        .sort({ createdAt: -1 });
    }

    // checking for blocked users
    const blockedData = await Setting.findOne({ userId });
    const blockedUsers = blockedData.blockedUsers;

    // if user has blocked users
    if (blockedUsers.length > 0) {
      blockedUsers.map(user => {
        posts.map(post => {
          // remove post from posts array
          if (post.madeBy._id.equals(user.userId)) {
            let index = posts.indexOf(post);
            posts.splice(index, 1);
          }
        });
      });
    };

    const blockedComms = blockedData.blockedCommunities;

    // if user has blocked users
    if (blockedComms.length > 0) {
      blockedComms.map(comm => {
        posts.map(post => {
          // remove post from posts array
          if (post.community.equals(comm.cid)) {
            let index = posts.indexOf(post);
            posts.splice(index, 1);
          }
        });
      });
    };

    // checking for muted words
    const mutedWords = blockedData.mutedWords;

    // if user has muted words
    if (mutedWords.length > 0) {
      mutedWords.map(word => {
        posts.map(post => {
          // remove post from posts array
          if (post.content.includes(word)) {
            let index = posts.indexOf(post);
            posts.splice(index, 1);
          }
        });
      });
    };

    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
      status: "Failed to retrieve posts.",
    });
  }
});

export default router;
