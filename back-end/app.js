import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'; // Import bcrypt for hashing passwords

// Import User and BudgetGoal models (lowercase filenames)
import User from './user.js';
import BudgetGoal from './budgetGoal.js';

dotenv.config({ silent: true });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ======================= Middleware ======================= */
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================= Temporary Data Storage ======================= */
const accounts = [];
const debts = [];

// Define routes (combine both versions)

// Root Route
app.get("/", (req, res) => {
    res.send("Hello!");
});

/* ======================= Account Routes ======================= */
app.get("/api/accounts", (req, res) => {
  res.json(accounts);
});

/* ======================= Sign-Up Route ======================= */
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already in use' });
        }

        const newUser = new User({ username, email, password: await bcrypt.hash(password, 10) });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ======================= Debt Routes ======================= */
// Define debt routes...

/* ======================= Goal Routes ======================= */
// Route to invite collaborator
app.post('/goals/:goalId/invite', async (req, res) => {
    try {
        const { goalId } = req.params;
        const { collaboratorEmail } = req.body;
        const goal = await BudgetGoal.findById(goalId);
        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }
        const collaborator = await User.findOne({ email: collaboratorEmail });
        if (!collaborator) {
            return res.status(404).json({ error: 'Collaborator not found' });
        }
        if (!goal.collaborators.includes(collaborator._id)) {
            goal.collaborators.push(collaborator._id);
            await goal.save();
        }
        res.status(200).json({ message: 'Collaborator added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve all goals for a user
app.get('/goals/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const goals = await BudgetGoal.find({
            $or: [{ owner: userId }, { collaborators: userId }]
        });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* ======================= User Account Routes ======================= */
// Route to get user details
app.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update user details
app.post('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, password, profilePicture } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* ======================= Transaction Routes ======================= */
// Define transaction routes...

/* ======================= Serve Frontend ======================= */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
