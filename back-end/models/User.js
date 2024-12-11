const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the user model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aboutMe: { type: String, default: '' },
    number: { type: String, default: '' },
    otherSocialMedia: { type: String, default: '' },
    friendsList: { type: [String], default: [] },
    profilePhoto: { type: String, default: '' }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if the password is modified
    try {
        this.password = await bcrypt.hash(this.password, 10); // Hash the password
        next();
    } catch (err) {
        next(err); // Pass errors to the next middleware
    }
});

// Compare passwords
userSchema.methods.comparePassword = async function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password); // Compare input with hashed password
};

// Export the User model
module.exports = mongoose.model('User', userSchema);
