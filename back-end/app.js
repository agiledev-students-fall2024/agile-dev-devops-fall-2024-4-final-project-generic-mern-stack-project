require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require("express") // import and instantiate express
const mongoose = require('mongoose');
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors'); // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

try {
    mongoose.connect(process.env.MONGODB_URI)
    console.log(`Connected to MongoDB.`)
  } catch (err) {
    console.log(
      `Error connecting to MongoDB user account authentication will fail: ${err}`
    )
  }

// import route files
const account = require('./routes/account');
const friends = require('./routes/friends');
const main = require('./routes/main');
const posts = require('./routes/posts');

//  use routes
app.use('/api/account', account);
app.use('/api/friends', friends);
app.use('/api/main', main);
app.use('/api/posts', posts);

// export the express app we created to make it available to other modules
module.exports = app
