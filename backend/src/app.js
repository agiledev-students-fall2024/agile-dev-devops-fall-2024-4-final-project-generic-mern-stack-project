import express from "express";
import { connectToDatabase } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import storesRoutes from "./routes/storesRoutes.js";
import savedRoutes from "./routes/savedRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json());

// routes
app.use("/user", userRoutes);
app.use("/stores", storesRoutes);
app.use("/routes", savedRoutes);

export default app;
