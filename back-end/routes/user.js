// Need this for home and post wilson

import express from "express";
import { protectRouter } from "../middlewares/auth.middleware.js";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/api/user-communities", protectRouter, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("communities");

    res.json({ communities: user.communities });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
