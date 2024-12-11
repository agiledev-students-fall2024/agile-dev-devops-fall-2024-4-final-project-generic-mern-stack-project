const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


// Load environment variables
dotenv.config();

// Import route files
const testRoute = require('./routes/testroute.js');
const pinRoutes = require('./routes/pinroutes.js');
const authRoutes = require('./routes/authroutes.js');
const mapRoutes = require('./routes/maproutes.js');
const userRoutes = require('./routes/userroutes.js');
const friendRoutes = require('./routes/friends.js');
const feedbackRoutes = require('./routes/feedbackroutes.js');
const contactRoutes = require('./routes/contactroutes.js');

// Initialize Express app
const app = express();

// Define port
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully.');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit process if connection fails
    }
};
connectToDatabase();

// Middleware setup
app.use(morgan('dev')); // Logs HTTP requests
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded payloads

// Default root route
app.get('/', (req, res) => {
    res.send('Hello World! Welcome to the Dreamer API.');
});

// Register API routes
app.use('/api/test', testRoute);
app.use('/api/pins', pinRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/contact', contactRoutes);

// Start the server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
