import "./config.mjs";
import express from 'express';
import session from 'express-session';
import sanitize from 'mongo-sanitize';
import multer from "multer";
import axios from "axios";
import cors from "cors";
import * as auth from './auth.mjs';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.backPORT || 5000;

app.use(
  cors({
    origin: `${process.env.frontPORT}`,
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use(session({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//       secure: false,
//       sameSite: 'lax'
//   }
// }));

app.get("/", (req, res) => {
  res.send("Hi");
});

//APIs for backend


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await auth.login(sanitize(username), password);
    // await auth.startAuthenticatedSession(req, newUser);
    // console.log('Session User', req.session.user);
    res.status(200).json({ message: 'Login successful', newUser });
  } catch (error) {
    console.log("does not try")
    res.status(401).json({ message: error.message });
  }
});

app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const newUser = await auth.register(sanitize(username), sanitize(email), password);
    // await auth.startAuthenticatedSession(req, newUser);
    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const tempRecipeShareStorage = []

app.post('/api/shareRecipe', async (req, res) => {
  const { foodName, story, recipe } = req.body;
  try {
    const shareRecipe = {
      foodName,
      story,
      recipe
    };
    tempRecipeShareStorage.push(shareRecipe)
    console.log(tempRecipeShareStorage)
    res.status(200).json({ message: 'Share Successful', shareRecipe });
  } catch (error) {
    console.log("does not try")
    res.status(401).json({ message: error.message });
  }
});



app.get("/api/activity-tracker", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://my.api.mockaroo.com/activities_tracker?key=594b4990"
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    res.status(500).json({ error: "Failed to fetch activity tracker data" });
  }
});

app.get("/api/challenges", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://my.api.mockaroo.com/challenges?key=594b4990"
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    res.status(500).json({ error: "Failed to fetch activity tracker data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
