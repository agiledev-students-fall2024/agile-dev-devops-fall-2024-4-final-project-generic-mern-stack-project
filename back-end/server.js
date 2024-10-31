import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();
const server = app;
const PORT = process.env.PORT || 3000;

// call express's listen function to start listening to the port
const listener = server.listen(PORT, function () {
  console.log(`Server running on port: ${PORT}`);
});

// a function to stop listening to the port
const close = () => {
  listener.close();
};

export default server;
