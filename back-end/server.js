// back-end/server.js

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Hardcoded login credentials
const HARD_CODED_USERNAME = "username";
const HARD_CODED_PASSWORD = "password";

// Routes
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the provided credentials match the hardcoded ones
    if (username === HARD_CODED_USERNAME && password === HARD_CODED_PASSWORD) {
        res.json({ message: "User logged in successfully." });
    } else {
        res.status(401).json({ error: "Invalid username or password." });
    }
});

app.post('/auth/user', (req, res) => {
    const { username, password } = req.body;
    res.status(201).json({ message: `User ${username} created successfully.` });
});

app.patch('/auth/user', (req, res) => {
    const { password } = req.body;
    res.json({ message: 'Password updated successfully.' });
});

// Start the server on port 8080
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
