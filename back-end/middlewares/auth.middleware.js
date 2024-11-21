// this is a middleware for user authentication

import User from "../models/user.model.js";

// make sure content is under proctect away from unauthorized users
export const protectRouter = async (req, res, next) => {
  try {
    console.log("response: ", res);
    const cookie = req.cookies["jwt-seraphim"];
    console.log(cookie);
    if (!cookie) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decodedCookie = jwt.verify(cookie, process.env.JWT_SECRET);
    if (!decodedCookie) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    const user = await User.findById(decodedCookie._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRouter middleware: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
