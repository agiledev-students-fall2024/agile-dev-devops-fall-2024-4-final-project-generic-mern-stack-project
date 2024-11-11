import express from "express";

const router = express.Router();

const joinCommunity = async (req, res) => {
  //   res.json({ message: "joinCommunity" });
  try {
    // const { communityId } = req.params;
    // const communityId = 1;
    const userId = 2;
    // const userId = req.user._id;
    // const user = await User.findById(userId); // find user by id
    // find community by id

    // hardcode info
    const user = {
      name: "john doe",
      username: "john_doe",
      email: "jd@gmail.com",
      password: "jd1234",
      communities: [],
    };
    const community = {
      name: "community1",
      communityId: req.params.communityID,
      members: [],
    };

    if (user.communities.includes(community.communityId)) {
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

router.post("/api/join-community/:communityID", joinCommunity);
export default router;
