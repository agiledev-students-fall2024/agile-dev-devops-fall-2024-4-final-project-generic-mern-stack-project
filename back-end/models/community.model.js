import mongoose from "mongoose";

const communitySchema = mongoose.Schema(
  {
    //Community id
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    communityPicture: [
      {
        type: String,
        default: "",
      },
    ],
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

export default Community;
