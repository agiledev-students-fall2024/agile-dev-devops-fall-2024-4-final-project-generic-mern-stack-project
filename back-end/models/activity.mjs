import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  activity_name: {
    type: String,
    required: true
  },
  activity_description: {
    type: String,
    required: false
  },
  date: {
    type: Date
  },
  activity_duration: [{
    type: Number,
    required: true
  }],
});

// const activity = mongoose.model("Activity", activitySchema);

export default activitySchema;
