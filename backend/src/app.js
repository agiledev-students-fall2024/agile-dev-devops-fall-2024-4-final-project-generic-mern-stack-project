import express from "express";
import authRoutes from "./routes/authRoutes.js";
// import filtersRoutes from "./routes/filtersRoutes.js";
// import storesRoutes from "./routes/storesRoutes.js";
import savedRoutes from "./routes/savedRoutes.js";
import dotenv from "dotenv";

dotenv.config();

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);
// app.use("/filters", filtersRoutes);
// app.use("/stores", storesRoutes);
app.use("/route", savedRoutes);

export default app;
