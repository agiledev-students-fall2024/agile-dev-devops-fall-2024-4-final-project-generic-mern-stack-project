const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const User = require('../models/User.js')

const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

// JWT authentication options for passport
let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET,
}
// console.log(jwtOptions) 

// define the method that is used by passport to verify the contents (i.e. the payload) of the JWT token
const jwtVerifyToken = async function (jwt_payload, next) {
  // console.log('JWT payload received', jwt_payload)

  const expirationDate = new Date(jwt_payload.exp * 1000)
  if (expirationDate < new Date()) {
    return next(null, false, { message: 'JWT token has expired.' })
  }

  const userId = ObjectId(jwt_payload.id)
  const user = await User.findOne({ _id: userId }).exec()
  if (user) {
    next(null, user)
  } else {
    next(null, false, { message: 'User not found' })
  }
}

// settubg some middleware code for using JWT that we'll pass to passport to use
const jwtStrategy = jwtOptions => {
  const strategy = new JwtStrategy(jwtOptions, jwtVerifyToken)
  return strategy
}

module.exports = jwtStrategy(jwtOptions, jwtVerifyToken)