/*
// Import express
import express from "express";
import { protectRouter } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/api/home", protectRouter, async (req, res) => {
  try {
    // const mockAPIUrl = 'https://my.api.mockaroo.com/posts.json?key=3ac6ebb0';

    // Fetch data from Mockaroo
    // const response = await axios.get(mockAPIUrl);
    const response = {
      data: {
        posts: [
          {
            id: 11,
            user: {
              id: 2,
              username: "artlover99",
              display_name: "Art Lover",
              profile_pic: "https://picsum.photos/201",
              about: "Art enthusiast and collector!",
            },
            liked_by: [3, 4, 5, 6, 7],
            likes: 5,
            images: [],
            content:
              "Visited an art gallery today, the colors were breathtaking!",
            replies: [
              {
                id: 12,
                user: {
                  id: 3,
                  username: "culturefan",
                  display_name: "Culture Fan",
                  profile_pic: "https://picsum.photos/202",
                  about: "Lover of all things cultural",
                },
                liked_by: [2, 5],
                likes: 2,
                images: [],
                content: "Which gallery did you go to?",
                replies: [],
              },
            ],
          },
          {
            id: 13,
            user: {
              id: 4,
              username: "travelguru",
              display_name: "Travel Guru",
              profile_pic: "https://picsum.photos/203",
              about: "World traveler and vlogger!",
            },
            liked_by: [2, 6, 8, 10],
            likes: 4,
            images: [],
            content:
              "Just got back from an amazing trip to Kyoto! The temples are stunning!",
            replies: [
              {
                id: 14,
                user: {
                  id: 5,
                  username: "wanderlust",
                  display_name: "Wanderlust",
                  profile_pic: "https://picsum.photos/204",
                  about: "Always looking for my next adventure!",
                },
                liked_by: [4, 7],
                likes: 2,
                images: [],
                content:
                  "Kyoto is on my bucket list! Did you see the cherry blossoms?",
                replies: [],
              },
            ],
          },
          {
            id: 15,
            user: {
              id: 6,
              username: "bookworm",
              display_name: "Book Worm",
              profile_pic: "https://picsum.photos/205",
              about: "Reader, writer, and coffee lover",
            },
            liked_by: [3, 5, 9],
            likes: 3,
            images: [],
            content:
              "Finished reading 'To Kill a Mockingbird' today. Such a powerful story.",
            replies: [
              {
                id: 16,
                user: {
                  id: 7,
                  username: "literaturefan",
                  display_name: "Literature Fan",
                  profile_pic: "https://picsum.photos/206",
                  about: "Words are my escape",
                },
                liked_by: [6, 8],
                likes: 2,
                images: [],
                content: "That’s one of my favorites! Have you read '1984'?",
                replies: [],
              },
            ],
          },
          {
            id: 17,
            user: {
              id: 8,
              username: "chefmaster",
              display_name: "Chef Master",
              profile_pic: "https://picsum.photos/207",
              about: "Cooking up flavors from around the world!",
            },
            liked_by: [2, 3, 6, 9, 10],
            likes: 5,
            images: [],
            content:
              "Experimented with Thai cuisine today! The spices are amazing!",
            replies: [
              {
                id: 18,
                user: {
                  id: 9,
                  username: "foodlover",
                  display_name: "Food Lover",
                  profile_pic: "https://picsum.photos/208",
                  about: "Living for flavors and experiences!",
                },
                liked_by: [8, 10],
                likes: 2,
                images: [],
                content: "Yum! Did you make a curry?",
                replies: [
                  {
                    id: 19,
                    user: {
                      id: 10,
                      username: "spiceguru",
                      display_name: "Spice Guru",
                      profile_pic: "https://picsum.photos/209",
                      about: "Spice up your life!",
                    },
                    liked_by: [8, 9, 10],
                    likes: 3,
                    images: [],
                    content: "Thai green curry is the best!",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    res.json(response.data); // Send the hardcoded posts as JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
      status: "Failed to retrieve posts from hardcoded data.",
    });
  }
});

export default router;
*/

import express from "express";
import { protectRouter } from "../middlewares/auth.middleware.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

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
