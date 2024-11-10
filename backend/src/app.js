import express from "express";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config();

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/user", userRoutes);

export default app;
