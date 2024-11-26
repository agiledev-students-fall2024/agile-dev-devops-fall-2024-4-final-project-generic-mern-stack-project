import "./config.mjs";
import express from "express";
import multer from "multer";
import axios from "axios";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import authRoutes from "../routes/authRoutes.mjs";
import mongoose, { mongo } from "mongoose";
import keys from "../keys.mjs";
import User from "../models/user.mjs"
import ActivitySchema from "../models/activity.mjs"
import Recipe from "../models/recipe.mjs"
import recipe from "../models/recipe.mjs";

const app = express();
const PORT = process.env.backPORT || 5000;
app.use(express.json());


// MongoDB Connection
const mango = keys.MONGOURI;
mongoose.connect(mango, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => console.log("Connected to MongoDB"));
mongoose.connection.on("error", (err) =>
  console.error("MongoDB connection error:", err)
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    // take apart the uploaded file's name so we can create a new one based on it
    const extension = path.extname(file.originalname);
    const basenameWithoutExtension = path.basename(
      file.originalname,
      extension
    );
    // create a new filename with a timestamp in the middle
    const newName = `${basenameWithoutExtension}-${Date.now()}${Math.random()}${extension}`;
    // tell multer to use this new filename for the uploaded file
    cb(null, newName);
  },
});
const upload = multer({ storage });
app.use(
  cors({
    origin: `${process.env.frontPORT}`,
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//APIs for backend
//for sign up and login
app.use("/api/auth", authRoutes);

const tempRecipeShareStorage = [];

app.post("/api/shareRecipe", async (req, res) => {
  const { foodName, story, recipe } = req.body;
  try {
    const shareRecipe = {
      foodName,
      story,
      recipe,
    };
    tempRecipeShareStorage.push(shareRecipe);
    console.log(tempRecipeShareStorage);
    res.status(200).json({ message: "Share Successful", shareRecipe });
  } catch (error) {
    console.log("does not try");
    res.status(401).json({ message: error.message });
  }
});

app.get("/api/recipes", async (req, res) => {
  try {
    const mockError = process.env.MOCK_ERROR === "true";
    if (mockError) {
      throw new Error("Forced error for testing");
    }
    const data = await recipe.find()
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    res.status(500).json({ error: "Failed to fetch recipe data" });
  }
});

app.get("/api/challenges", async (req, res) => {
  try {
    const mockError = process.env.MOCK_ERROR === "true";
    if (mockError) {
      throw new Error("Forced error for testing");
    }
    const data = await recipe.find({isChallenge:true})
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    res.status(500).json({ error: "Failed to fetch activity tracker data" });
  }
});

app.post("/api/upload-recipe-image", upload.array("my_files", 2),(req, res, next) => {
    if (!req.files || req.files.length === 0) {
      // No files uploaded
      return res.status(400).json({
        status: "error",
        message: "No files uploaded",
      });
    }

    // Ensure only one file is uploaded
    if (req.files.length > 1) {
      return res.status(400).json({
        status: "error",
        message: "Too many files uploaded",
      });
    }

    // Check if the file is an image by inspecting the mimetype
    const file = req.files[0];
    // Success response if valid image
    res.json({
      status: "success",
      message: "File uploaded successfully",
      file: file,
    });
  }
);

app.get("/api/users", async (req, res) => {
  try {
    if (process.env.MOCK_ERROR === "true") {
      throw new Error("Mocked error");
    }
    const { data } = await axios.get(
      "https://my.api.mockaroo.com/users.json?key=66da8e80"
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});


app.get("/api/biteBuddyProfile", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://my.api.mockaroo.com/bite_buddy_profile.json?key=786e37d0"
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    res.status(500).json({ error: "Failed to fetch bite buddy profile data" });
  }
});

app.get("/api/basicRecipe", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://my.api.mockaroo.com/basic_recipe.json?key=786e37d0"
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes data" });
  }
});

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();

export default app;
