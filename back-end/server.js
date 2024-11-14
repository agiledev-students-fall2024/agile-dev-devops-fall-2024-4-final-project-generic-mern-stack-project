// back-end/server.js

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const codeRoutes = require('./routes/code');
const whiteboardRoutes = require('./routes/whiteboard');

// Hardcoded login credentials
const HARD_CODED_USERNAME = "username";
const HARD_CODED_PASSWORD = "password";

// In-memory storage for meetings (temporary until database is implemented)
const meetings = new Map();

// Auth Routes
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
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

// Meeting Routes
app.get('/meeting/:id', (req, res) => {
    const meetingId = req.params.id;
    const meeting = meetings.get(meetingId);

    if (!meeting) {
        return res.status(404).json({ error: 'Meeting not found' });
    }

    res.json(meeting);
});

app.post('/meeting', (req, res) => {
    const meetingId = Math.random().toString().slice(2, 12);
    const newMeeting = {
        id: meetingId,
        createdAt: new Date().toISOString(),
        participants: [],
        settings: {
            allowChat: true,
            allowCodeEditor: true,
            allowWhiteboard: true,
            allowScreenShare: true
        }
    };

    meetings.set(meetingId, newMeeting);
    res.status(201).json(newMeeting);
});

// Code Routes
app.use('/code', codeRoutes);
app.use('/whiteboard', whiteboardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});

module.exports = app;