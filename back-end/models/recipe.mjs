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
  duration:{
    type: Number,
    required: true
  },
  prep_time:{
    type: Number,
    required: true
  },
  cook_time:{
    type: Number,
    required: true
  },
  total_time:{
    type: Number,
    required: true
  },
  cuisine:{
    type: String,
    required: true
  },
  difficulty_level:{
    type: Number,
    required: true
  },
  calories_per_serving:{
    type: Number,
    required: true
  },
  rating:{
    type: Number,
    required: true
  },

});

const recipe = mongoose.model("Recipe", recipeSchema);

export default recipe;
