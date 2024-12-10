// Import dependencies
require('./config.js');
const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middlewares/authMiddleware'); // Import auth middleware

// Import route handlers
const taskRoutes = require('./Task_Routes/task.js');
const goalRoutes = require('./Goal_Routes/goal.js');
const calendarRoutes = require('./Calendar_Routes/calendar.js');
const authRoutes = require('./Authentication/authentication.js');

// Initialize Express app
const app = express();

// Enable CORS for cross-origin requests
app.use(
    cors({
        origin: 'http://localhost:3000', // Allow requests from your front-end app
        methods: ["GET", "POST", "DELETE", "PUT"]
    })
);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Public routes (authentication)
app.use(authRoutes); // Login and registration routes remain public

// Protected routes (require authentication)
app.use('/tasks', authMiddleware, taskRoutes);
app.use('/goals', authMiddleware, goalRoutes);
app.use('/calendar', authMiddleware, calendarRoutes);

// Error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Export the app for use in server.js
module.exports = app;
