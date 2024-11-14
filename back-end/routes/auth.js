// this is a route for authentication
import express from "express";
// import User from "../models/user.model.js";

const router = express.Router();
export const user = {
  id: 1,
  display_name: '',
  username: '',
  about: 'This user hasn’t added a bio yet...',
  posts: [],
  communities: [],
  profile_pic: 'default_pic.png',
  signedIn: true,
  followers: [],
  following: []
}

export const signup = async (req, res) => {
  // res.json({ message: "signup" });
  try {
    const { name, username, password, email } = req.body;
    // const existingEmail = await User.findOne({ email });
    // const existingUsername = await User.findOne({ email });

    if (!name || !username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //todo1: check if email and username already exist
    // todo :hash password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters long" });
    }

    //todo2: implement mailTrap api

    //todo: create cookie
    user.display_name = name;
    user.username = username;
    user.email = email;
    user.password = password;

    //todo3: save user to database

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error in signup", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // find a user by username
    // compare the password and hash
    // create a cookie
    user.username = username;

    res
      .status(200)
      .json({ message: "Logged in successfully", username, password });
  } catch (error) {
    console.error("Error in login", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  //todo: clear authenticated user
  res.status(200).json({ message: "Logged out successfully" });
};

router.post("/api/signup", signup);
router.post("/api/login", login);
router.post("/api/logout", logout);

export default router;

