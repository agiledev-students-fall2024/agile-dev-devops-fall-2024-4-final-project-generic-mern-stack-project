import express from "express";
// import multer from "multer";
import axios from "axios";
import morgan from "morgan";
import cors from "cors";

// import routes
import accountSettings from "./routes/account-settings.js";
import blocked from "./routes/blocked.js";
import accessibility from "./routes/accessibility.js";
import auth from "./routes/auth.js";
import community from "./routes/community.js";
import searchCommunity from "./routes/search-community.js";
import subcommunity from "./routes/subcommunity.js";
import home from "./routes/home.js";
import post from "./routes/post.js";
import multer from "./lib/multer.js";

const app = express(); // instantiate an Express object

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev"));

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"));

// adding CORS middleware
app.use(cors());

// use routes
app.use(accountSettings);
app.use(blocked);
app.use(accessibility);

app.use(auth);
app.use(community);
app.use(multer);

app.use(searchCommunity);
app.use(subcommunity);

app.use(home);
app.use(post);

export default app;
