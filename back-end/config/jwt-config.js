const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const User = require('../models/User.js')

const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

// JWT authentication options for passport
let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: process.env.JWT_SECRET,
}
// console.log(jwtOptions) 

// define the method that is used by passport to verify the contents (i.e. the payload) of the JWT token
const jwtVerifyToken = async function (jwt_payload, done) {
  // console.log('JWT payload received', jwt_payload)
  try {
    const expirationDate = new Date(jwt_payload.exp * 1000)
    if (expirationDate < new Date()) {
      return done(null, false, { message: 'JWT token has expired.' })
    }

    const userId = new ObjectId(jwt_payload.id);
    const user = await User.findOne({ _id: userId }).exec()

    if (user) {
      // console.log('User found:', user);
      done(null, user)
    } else {
      done(null, false, { message: 'User not found' })
    }
  } catch(error) {
      // console.error('Error during JWT verification:', error);
      return done(error, false, { message: 'An error occurred during JWT verification' })
  }
  
}

// settubg some middleware code for using JWT that we'll pass to passport to use
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerifyToken)

module.exports = jwtStrategy