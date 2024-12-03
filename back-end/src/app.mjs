import "./config.mjs";
import express from "express";
import multer from "multer";
import axios from "axios";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import authRoutes from "../routes/authRoutes.mjs";
import mongoose from "mongoose";
import keys from "../keys.mjs";
import User from "../models/user.mjs";
import ActivitySchema from "../models/activity.mjs";
import Recipe from "../models/recipe.mjs";
import path from "path";

// Set up paths and directories
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.backPORT || 5000;

// MongoDB Connection
mongoose.connect(keys.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => console.log("Connected to MongoDB"));
mongoose.connection.on("error", (err) =>
  console.error("MongoDB connection error:", err)
);

// Configure CORS
app.use(
  cors({
    origin: `${process.env.frontPORT}`,
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes for auth
app.use("/api/auth", authRoutes);

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads"); // Upload directory
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const basenameWithoutExtension = path.basename(
      file.originalname,
      extension
    );
    const newName = `${basenameWithoutExtension}-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}${extension}`;
    cb(null, newName);
  },
});

const upload = multer({ storage });

// File upload API
app.post("/api/upload-recipe-image", upload.single("my_file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: "error",
      message: "No file uploaded",
    });
  }

  // Check if the uploaded file is an image
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid file type. Only images are allowed.",
    });
  }

  res.status(200).json({
    status: "success",
    message: "File uploaded successfully",
    file: req.file,
  });
});

// Example API for recipe sharing
app.post("/api/shareRecipe", upload.single("image"), async (req, res) => {
  try {
    // Extract the uploaded image's path if it exists
    const imagePath = req.file ? req.file.path : null;

    // Merge form data and the image path
    const newRecipeData = { ...req.body, image: imagePath };

    // Create and save the new recipe
    const newRecipe = new Recipe(newRecipeData);
    await newRecipe.save();

    res.status(200).json({ message: "Share Successful", newRecipe });
  } catch (error) {
    console.error("Error sharing recipe:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// Example API for retrieving recipes
app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// Other APIs (e.g., challenges, user profiles) remain unchanged...

// Start the server
export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();

export default app;
