import mongoose from "mongoose";
import userRecipeSchema from "./userRecipe.mjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recipes: [userRecipeSchema]
});

const user = mongoose.model("User", userSchema);

export default user;
