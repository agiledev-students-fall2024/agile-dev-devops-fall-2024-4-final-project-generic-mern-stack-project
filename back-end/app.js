import express from "express";
import multer from "multer";
import axios from "axios";
import morgan from "morgan";

const app = express(); // instantiate an Express object

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("public"));

// we will put some server logic here later...

export default app;
