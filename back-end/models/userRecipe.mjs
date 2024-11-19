import mongoose from "mongoose";

const userRecipeSchema = new mongoose.Schema({
  id: {
      type: ObjectId,
      required: true
  },
  duration: {
      type: Number,
      required: true
  },
  completed: {
      type: Boolean,
      required: true
  },
  duration: {
      type: Number,
      required: true
  }
});

const userRecipe = mongoose.model("UserRecipe", userRecipeSchema);

export default userRecipe;
