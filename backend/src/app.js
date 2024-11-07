import express from "express";
import authRoutes from "./routes/authRoutes.js";
import filtersRoutes from "./routes/filtersRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/filters", filtersRoutes);

export default app;
