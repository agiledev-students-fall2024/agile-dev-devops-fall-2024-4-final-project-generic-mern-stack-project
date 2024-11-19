import express from "express";
import * as auth from "./auth.mjs";
import sanitize from "mongo-sanitize";
import mongoose from "mongoose";
import user from "../models/user.mjs";
import bcrypt from "bcryptjs";

const router = express.Router();

/*
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await auth.login(sanitize(username), password);
    res.status(200).json({ message: "Login successful", newUser });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});*/

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const savedUser = await user.findOne({ email: email });
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "User already exists with that email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new user({
      username,
      email,
      password: hashedPassword, // Use hashed password
    });

    // Save the user
    await newUser.save();
    res.json({ message: "User saved successfully" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/*
  try {
    const newUser = await auth.register(
      sanitize(username),
      sanitize(email),
      password
    );
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});*/

export default router;
