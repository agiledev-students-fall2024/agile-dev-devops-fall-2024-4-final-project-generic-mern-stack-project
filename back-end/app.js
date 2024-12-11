require('./config.js');
const express = require('express');
const cors = require('cors');

// Import route handlers
const taskRoutes = require('./Task_Routes/task.js');
const goalRoutes = require('./Goal_Routes/goal.js');
const calendarRoutes = require('./Calendar_Routes/calendar.js');
const authRoutes = require('./Authentication/authentication.js');

// Initialize Express app
const app = express();

// Enable CORS for cross-origin requests
app.use(cors({ origin: 'http://localhost:3000', methods: ["GET", "POST", "DELETE", "PUT"] }));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Public routes (authentication)
app.use(authRoutes); // Login and registration routes remain public

// Protected routes (require authentication)
app.use('/tasks', taskRoutes);
app.use('/goals', goalRoutes);
app.use('/calendar', calendarRoutes);

// Log all registered routes
console.log('Available routes:', app._router.stack.filter(r => r.route).map(r => r.route.path));

// Catch-all route for debugging
app.all('*', (req, res) => {
    console.log(`Request received at ${req.method} ${req.url}`);
    res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
