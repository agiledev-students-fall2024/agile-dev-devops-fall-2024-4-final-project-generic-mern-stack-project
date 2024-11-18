import { app } from "../app.js";
import { User } from "../models/user.js";
import { Types } from "mongoose";

app.get("/user", async (req, res) => {
  const user_id = req.query.id

  if (!user_id) {
    console.log("No userId queried");
    res.status = 400;
    res.send("No userId queried");
    return
  }

  const objectId = Types.ObjectId(user_id);

  try {
    const user = await User.findById(objectId);

    if (!user) {
      console.log("User not found")
      res.status = 404;
      res.send("User not found");
      return
    }

    res.json(user.toJson())

  } catch (error) {
    console.error('Error fetching user:', error);
    res.status = 500;
    res.send(`Error fetching user: ${error}`);
    return
  }

})
