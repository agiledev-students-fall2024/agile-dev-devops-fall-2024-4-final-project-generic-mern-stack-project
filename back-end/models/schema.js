require("../config")
const mongoose = require("mongoose")
const { Schema } = mongoose

mongoose.connect(process.env.DSN) 
const TaskSchema = new mongoose.Schema({
    name: {required: true, type: String},
    due: { type: Date},
    description: {required: false, type: String},
    status: {required: true, type: String},
    priority: {required: true, type: String},
    subject: {required: true, type: String},
    recurring: {required: true, type: String},
    recurring_period: {type: String},
    user_id: {type: Schema.Types.ObjectId, ref: 'User'}
  })

  const UserSchema = new mongoose.Schema({
    username: {required: true, type: String},
    password_hash: {required: true, type: String},
    name: {required: true, type: String}
  })

const Task = mongoose.model("Task", TaskSchema)
const User = mongoose.model("User", UserSchema)

