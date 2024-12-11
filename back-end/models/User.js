const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [50, 'Username cannot exceed 50 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// return a JWT token for the user
userSchema.methods.generateJWT = function () {
    const today = new Date()
    const exp = new Date(today)
    exp.setDate(today.getDate() + 14) // assuming an environment variable with num days in it
  
    return jwt.sign(
      {
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
      },
      process.env.JWT_SECRET
    )
  }

module.exports = mongoose.model('User', userSchema);
