const express = require("express");
const cors = require("cors");
require("dotenv").config({ silent: true });
const bodyParser = require('body-parser')

const restaurantsRouter = require("../app/routes/restaurant_routes");
const authRouter = require("../app/routes/auth_routes");
const userRouter = require("../app/routes/user_routes");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/restaurants", restaurantsRouter);
app.use("/auth", authRouter)
app.use("/user", userRouter)

module.exports = app;
