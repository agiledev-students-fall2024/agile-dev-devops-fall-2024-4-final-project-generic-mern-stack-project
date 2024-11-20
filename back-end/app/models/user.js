const mongoose = require("mongoose"); 

const user_schema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_pic: { type: String, required: false },
  },
  { toJSON: { virtuals: true } } 
);

// Define a virtual field for `profilePic`
user_schema.virtual("profilePic").get(function () {
  return this.profile_pic;
});

// Modify the JSON output to include virtuals and exclude `profile_pic`
user_schema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.profile_pic; // Remove the snake_case field from the JSON output
    return ret;
  },
});

// Define the User model
const User = mongoose.model("User", user_schema);

module.exports = User; 
