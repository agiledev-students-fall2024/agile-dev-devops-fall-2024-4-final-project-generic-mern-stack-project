import mongoose from "mongoose";

const userRecipeSchema = new mongoose.Schema({
  id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
  },
  duration: {
      type: Number,
      default: 0,
      required: true
  },
  completed: {
      type: Boolean,
      default: false,
      required: true
  }
});

// const userRecipe = mongoose.model("UserRecipe", userRecipeSchema);

export default userRecipeSchema;
