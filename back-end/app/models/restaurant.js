const mongoose = require("mongoose");

const restaurant_schema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  location: { type: String, required: true },
  link: { type: String, required: false },
  images: { type: [String], required: true },
  pills: { type: [String], required: true },
});

const Restaurant = mongoose.model("Restaurant", restaurant_schema);

module.exports = Restaurant; 
