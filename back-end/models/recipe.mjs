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
  }]
});

const recipe = mongoose.model("Recipe", recipeSchema);

export default recipe;
