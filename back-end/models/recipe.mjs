import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  ingredients: [{
    type: String,
    required: true
  }],
  steps: [{
    type: String,
    required: true
  }],
  duration: {
    type: Number,
    required: false
  }
});

const recipe = mongoose.model("Recipe", recipeSchema);

export default recipe;
