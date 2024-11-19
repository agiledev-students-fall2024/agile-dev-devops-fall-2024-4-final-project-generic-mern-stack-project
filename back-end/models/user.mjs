import mongoose from "mongoose";
import userRecipeSchema from "./userRecipe.mjs";
import activitySchema from "./activity.mjs"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  recipes: [userRecipeSchema],
  activities: [activitySchema]
});

const user = mongoose.model("User", userSchema);

export default user;
