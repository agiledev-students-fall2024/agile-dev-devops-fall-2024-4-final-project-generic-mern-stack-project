import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const mockUser = {
  _id: "123456789",
  username: "testuser",
  saved_routes: [
    {
      _id: "route1",
      name: "Test Route",
      stores: [
        {
          _id: "store1",
          name: "Test Store",
          location: "Test Location",
        },
      ],
    },
  ],
};

const mockHashedPassword = "passwordhashed";

// verify token route
router.get("/verify-token", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      // Return mock user data
      res.json(mockUser);
    });
  } catch (error) {
    res.status(500).json({ message: "Error verifying token", error });
  }
});

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // "username already exists" check
    if (username === "existinguser") {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create and sign JWT
    const token = jwt.sign(
      { userId: "new123", username: username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // only need to return username. Client will call verifyToken to get full user object
    res.status(201).json({ token, username });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Mock authentication
    if (username !== "testuser" || password !== "testpassword") {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and sign JWT. Store only userId and username
    const token = jwt.sign(
      { userId: mockUser._id, username: username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // only need to return username. Client will call verifyToken to get full user object
    res.json({ token, username });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
