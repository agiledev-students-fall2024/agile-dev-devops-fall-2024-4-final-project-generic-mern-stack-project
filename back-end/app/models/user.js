import { SchemaTypes, mongoose } from "mongoose";

const user_schema = new mongoose.Schema({
  _id: {type: SchemaTypes.ObjectId, require: true},
  email: {type: String, require: true},
  profile_pic: {type: String, require: false}
}, {toJson: {virtuals: true}});

user_schema.virtual("profilePic").get(function() {
  return this.profile_pic;
});

user_schema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.profile_pic; // Remove the snake_case field in the JSON output
    return ret;
  }
});

const User = mongoose.model('User', user_schema);

export default User;
