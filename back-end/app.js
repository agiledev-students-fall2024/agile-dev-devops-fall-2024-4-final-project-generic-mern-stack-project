import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'; // Import bcrypt for hashing passwords

// Import User and BudgetGoal models (lowercase filenames)
import User from './models/User.js';
import BudgetGoal from './budgetGoal.js';


dotenv.config({ silent: true });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* MOCK USER SESSION WHILE AWAITING LOGIN IMPLEMENTATION */
// Define mock userId and budgetId
const MOCK_USER_ID = 1;
const MOCK_BUDGET_ID = 1;


/* Initialize Express App */
const app = express();

/* ======================= Middleware ======================= */
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* ======================= Data Storage ======================= */
// Temporary in-memory storage for accounts and debts
const accounts = [];
const debts = [];

// connect to the database
console.log(`Connecting to MongoDB at ${process.env.MONGODB_URI}`)
try {
  mongoose.connect(process.env.MONGODB_URI)
  console.log(`Connected to MongoDB.`)
} catch (err) {
  console.log(
    `Error connecting to MongoDB user account authentication will fail: ${err}`
  )
}

// Root Route
app.get("/", (req, res) => {
    res.send("Hello!");
});

/* ======================= Account Routes ======================= */
// Route to get all accounts
app.get("/api/accounts", (req, res) => {
  res.json(accounts);
});

// Route to add a new account
app.post("/api/accounts", (req, res) => {
  const { type, amount, number } = req.body;
  if (!type || amount == null || !number) {
    return res.status(400).json({ error: "Type, amount, and account number are required" });
  }
  const newAccount = { id: accounts.length + 1, type, amount, number };
  accounts.push(newAccount);
  res.status(201).json(newAccount);
});

// Route to update an account by ID
app.put("/api/accounts/:id", (req, res) => {
  const { id } = req.params;
  const { type, amount, number } = req.body;
  const accountIndex = accounts.findIndex((account) => account.id === parseInt(id));

  if (accountIndex === -1) {
    return res.status(404).json({ error: "Account not found" });
  }

  accounts[accountIndex] = { ...accounts[accountIndex], type, amount, number };
  res.json(accounts[accountIndex]);
});

// Route to delete an account by ID
app.delete("/api/accounts/:id", (req, res) => {
  const { id } = req.params;
  const accountIndex = accounts.findIndex((account) => account.id === parseInt(id));

  if (accountIndex === -1) {
    return res.status(404).json({ error: "Account not found" });
  }

  accounts.splice(accountIndex, 1);
  res.status(204).send();
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
// Route to update a debt by ID
app.put("/api/debts/:id", (req, res) => {
  const { id } = req.params;
  const { type, amount, dueDate, paymentSchedule } = req.body;
  const debtIndex = debts.findIndex((debt) => debt.id === parseInt(id));

  if (debtIndex === -1) {
    return res.status(404).json({ error: "Debt not found" });
  }

  debts[debtIndex] = { ...debts[debtIndex], type, amount, dueDate, paymentSchedule };
  res.json(debts[debtIndex]);
});

// Route to delete a debt by ID
app.delete("/api/debts/:id", (req, res) => {
  const { id } = req.params;
  const debtIndex = debts.findIndex((debt) => debt.id === parseInt(id));

  if (debtIndex === -1) {
    return res.status(404).json({ error: "Debt not found" });
  }

  debts.splice(debtIndex, 1);
  res.status(204).send();
});

// Route to add a new debt
app.post("/api/debts", (req, res) => {
  console.log("Received debt:", req.body);
  const { type, amount, dueDate, paymentSchedule } = req.body;
  if (!type || amount == null || !dueDate || !paymentSchedule) {
    return res.status(400).json({ error: "Type, amount, due date, and payment schedule are required" });
  }
  const newDebt = { id: debts.length + 1, type, amount, dueDate, paymentSchedule };
  debts.push(newDebt);
  res.status(201).json(newDebt);
});

// Route to get all debts
app.get("/api/debts", (req, res) => {
  res.json(debts);
});

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
app.get("/api/transactions", (req, res) => {
  const userId = req.query.userId ? parseInt(req.query.userId) : MOCK_USER_ID;
  const budgetId = req.query.budgetId ? parseInt(req.query.budgetId) : MOCK_BUDGET_ID;
  console.log("Fetching transactions for userId:", userId, "budgetId:", budgetId);
  
  const userTransactions = transactionData.filter(transaction => 
    transaction.userId === userId && transaction.budgetId === budgetId
  );

  res.json(userTransactions);
});


/* ======================= Recurring Payments Routes ======================= */

app.get("/api/recurring-bills", (req, res) => {
    // Get userId and budgetId from query or use defaults
    const userId = req.query.userId ? parseInt(req.query.userId) : MOCK_USER_ID;
    const budgetId = req.query.budgetId ? parseInt(req.query.budgetId) : MOCK_BUDGET_ID;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const userRecurringBills = recurringBills.filter(bill => 
        bill.userId === userId && (!budgetId || bill.budgetId === budgetId)
  );

  res.json(userRecurringBills);
});

/* ======================= Budget Limits Routes ======================= */
app.get("/api/budget-limits", (req, res) => {
    const userId = req.query.userId ? parseInt(req.query.userId) : MOCK_USER_ID;
    const budgetId = req.query.budgetId ? parseInt(req.query.budgetId) : MOCK_BUDGET_ID;

    const userBudgetLimit = budgetLimits.find(
        (limit) => limit.userId === userId && limit.budgetId === budgetId
    );

    if (!userBudgetLimit) {
        return res.status(404).json({ error: "Budget limits not found for this user and budget." });
    }

    res.json(userBudgetLimit);
});

  

/* ======================= Serve Frontend (React App) ======================= */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../front-end/build")));
  app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../front-end/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
      res.send("API is running... Front-end development server handles UI.");
  });
}

export default app;
