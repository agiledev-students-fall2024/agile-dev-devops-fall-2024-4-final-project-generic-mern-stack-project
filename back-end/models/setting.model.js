import mongoose from "mongoose";

const settingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  mutedWords: [
    {
      type: String,
    },
  ],
  blockedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  blockedCommunities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
  displayMode: {
    type: String,
    //default: "light",
  },
  fontSize: {
    type: String,
    //default: "medium",
  },
  imagePreference: {
    type: String,
    //default: "auto",
  },
});

const Setting = mongoose.model("Setting", settingSchema);
