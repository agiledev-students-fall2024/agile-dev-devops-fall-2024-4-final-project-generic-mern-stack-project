import { SchemaTypes, mongoose } from "mongoose";

const restaurant_schema = new mongoose.Schema({
  _id: {type: SchemaTypes.ObjectId, require: true},
  name: {type: String, require: true},
  description: {type: String, require: false},
  location: {type: String, require: true},
  link: {type: String, require: false},
  images: {type: [String], require: true},
  pills: {type: [String], require: true},
});

const Restaurant = mongoose.model('Restaurant', user_schema);

export default Restaurant;
