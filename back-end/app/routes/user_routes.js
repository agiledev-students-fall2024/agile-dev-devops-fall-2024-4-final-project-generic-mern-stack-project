const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); 
const User = require("../models/User");

router.get("/", async (req, res) => {
  const user_id = req.query.id;

  if (!user_id) {
    console.log("No userId queried");
    res.status(400).send("No userId queried");
    return;
  }

  // Validate if user_id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    console.log("Invalid userId format");
    res.status(400).send("Invalid userId format");
    return;
  }

  try {
    const objectId = mongoose.Types.ObjectId(user_id);
    const user = await User.findById(objectId);

    if (!user) {
      console.log("User not found");
      res.status(404).send("User not found");
      return;
    }

    res.json(user.toJSON()); // Ensure `toJSON` is implemented in the User schema
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send(`Error fetching user: ${error}`);
  }
});

module.exports = router;
