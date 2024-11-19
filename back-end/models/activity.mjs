import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  date: {
    type: Date
  },
  duration: [{
    type: Number,
    required: true
  }],
  image: [{
    type: String,
    required: false
  }]
});

// const activity = mongoose.model("Activity", activitySchema);

export default activitySchema;
