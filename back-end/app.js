import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { authenticateToken } from './middleware/auth.js';

 
//MOCK DATA
import budgetLimits from './mocks/budgetLimits.js';
import recurringBills from './mocks/recurringBills.js';
import transactionData from './mocks/transactionData.js';
import goals from './mocks/goals.js';
import { getNotifications } from './notifications.js';
 
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'; // Import bcrypt for hashing passwords
 
// Import User and BudgetGoal models (lowercase filenames)
import User from './models/User.js';
import router from './userRoutes.js';
 
// import BudgetGoal from './models/budgetGoal.js';
 
dotenv.config({ silent: true });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
 
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
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
 
// Root Route
app.get('/', (req, res) => {
  res.send('Hello!');
});

// use the specialized routing files
app.use('/user', router); // all requests for /user/* will be handled by the user router
 
/* ======================= Account Routes ======================= */
// Route to get all accounts
app.get('/api/accounts', (req, res) => {
  res.json(accounts);
});
 
// Route to add a new account
app.post('/api/accounts', (req, res) => {
  const { type, amount, number } = req.body;
  if (!type || amount == null || !number) {
    return res
      .status(400)
      .json({ error: 'Type, amount, and account number are required' });
  }
  const newAccount = { id: accounts.length + 1, type, amount, number };
  accounts.push(newAccount);
  res.status(201).json(newAccount);
});
 
// Route to update an account by ID
app.put('/api/accounts/:id', (req, res) => {
  const { id } = req.params;
  const { type, amount, number } = req.body;
  const accountIndex = accounts.findIndex(
    (account) => account.id === parseInt(id)
  );
 
  if (accountIndex === -1) {
    return res.status(404).json({ error: 'Account not found' });
  }
 
  accounts[accountIndex] = { ...accounts[accountIndex], type, amount, number };
  res.json(accounts[accountIndex]);
});
 
// Route to delete an account by ID
app.delete('/api/accounts/:id', (req, res) => {
  const { id } = req.params;
  const accountIndex = accounts.findIndex(
    (account) => account.id === parseInt(id)
  );
 
  if (accountIndex === -1) {
    return res.status(404).json({ error: 'Account not found' });
  }
 
  accounts.splice(accountIndex, 1);
  res.status(204).send();
});
 
/* ======================= Debt Routes ======================= */
// Route to update a debt by ID
app.put('/api/debts/:id', (req, res) => {
  const { id } = req.params;
  const { type, amount, dueDate, paymentSchedule } = req.body;
  const debtIndex = debts.findIndex((debt) => debt.id === parseInt(id));
 
  if (debtIndex === -1) {
    return res.status(404).json({ error: 'Debt not found' });
  }
 
  debts[debtIndex] = {
    ...debts[debtIndex],
    type,
    amount,
    dueDate,
    paymentSchedule,
  };
  res.json(debts[debtIndex]);
});
 
// Route to delete a debt by ID
app.delete('/api/debts/:id', (req, res) => {
  const { id } = req.params;
  const debtIndex = debts.findIndex((debt) => debt.id === parseInt(id));
 
  if (debtIndex === -1) {
    return res.status(404).json({ error: 'Debt not found' });
  }
 
  debts.splice(debtIndex, 1);
  res.status(204).send();
});
 
// Route to add a new debt
app.post('/api/debts', (req, res) => {
  console.log('Received debt:', req.body);
  const { type, amount, dueDate, paymentSchedule } = req.body;
  if (!type || amount == null || !dueDate || !paymentSchedule) {
    return res.status(400).json({
      error: 'Type, amount, due date, and payment schedule are required',
    });
  }
  const newDebt = {
    id: debts.length + 1,
    type,
    amount,
    dueDate,
    paymentSchedule,
  };
  debts.push(newDebt);
  res.status(201).json(newDebt);
});
 
// Route to get all debts
app.get('/api/debts', (req, res) => {
  res.json(debts);
});
 
/* ======================= Goal Routes ======================= */
// Route to invite collaborator
app.get('/goals', async (req, res) => {
  const { ownerId, collaboratorId } = req.query;
 
  try {
    const filter = {};
    if (ownerId) filter.ownerId = ownerId;
    if (collaboratorId) filter.collaborators = collaboratorId;
 
    const goals = await BudgetGoal.find(filter).populate(
      'collaborators',
      'username email'
    );
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
// Create a new goal
app.post(
  '/goals',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('targetAmount')
      .isNumeric()
      .withMessage('Target amount must be a number'),
    body('ownerId').notEmpty().withMessage('Owner ID is required'),
    body('frequency').notEmpty().withMessage('frequency is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 
    const { name, targetAmount, ownerId, frequency } = req.body;
 
    try {
      const newGoal = new BudgetGoal({
        name,
        targetAmount,
        frequency,
        currentAmount: 0, // Start with 0
        ownerId,
      });
 
      await newGoal.save();
      res
        .status(201)
        .json({ message: 'Goal created successfully', goal: newGoal });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
 
app.delete('/goals/:goalId', async (req, res) => {
  const { goalId } = req.params;
 
  try {
    const deletedGoal = await BudgetGoal.findByIdAndDelete(goalId);
    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
// Add a collaborator to a goal
app.post('/goals/:goalId/collaborators', async (req, res) => {
  const { goalId } = req.params;
  const { collaboratorId } = req.body;
 
  try {
    const goal = await BudgetGoal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
 
    if (!goal.collaborators.includes(collaboratorId)) {
      goal.collaborators.push(collaboratorId);
      await goal.save();
    }
 
    res.json({ message: 'Collaborator added successfully', goal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
// Link a transaction to a goal
app.post('/goals/:goalId/transactions', async (req, res) => {
  const { goalId } = req.params;
  const { amount } = req.body;
 
  try {
    const goal = await BudgetGoal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
 
    goal.currentAmount += amount; // Increment currentAmount
    await goal.save();
 
    res.json({ message: 'Transaction added to goal', goal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
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
      $or: [{ owner: userId }, { collaborators: userId }],
    });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
/* ======================= Transaction Routes ======================= */
// Route to get all transactions
app.get("/api/transactions", async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await User.findById(userId).select('transactions');
    if (!user) {
      console.error("User not found for ID:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Fetched transactions:", user.transactions);
    res.json(user.transactions || []);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

 
// Route to add a new transaction
app.post('/api/transactions', (req, res) => {
  const { merchant, category, amount, date } = req.body;
  if (!merchant || !category || amount == null || !date) {
    return res
      .status(400)
      .json({ error: 'Merchant, category, amount, and date are required' });
  }
  const newTransaction = {
    id: transactionData.length + 1,
    merchant,
    category,
    amount,
    date,
  };
  transactionData.push(newTransaction);
  res.status(201).json(newTransaction);
});
 
// Route to update a transaction by ID
app.put('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  const { merchant, category, amount, date } = req.body;
  const transactionIndex = transactionData.findIndex(
    (transaction) => transaction.id === parseInt(id)
  );
 
  if (transactionIndex === -1) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
 
  transactions[transactionIndex] = {
    ...transactions[transactionIndex],
    merchant,
    category,
    amount,
    date,
  };
  res.json(transactionData[transactionIndex]);
});
 
// Route to delete a transaction by ID
app.delete('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  const transactionIndex = transactionData.findIndex(
    (transaction) => transaction.id === parseInt(id)
  );
 
  if (transactionIndex === -1) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
 
  transactionData.splice(transactionIndex, 1);
  res.status(204).send();
});
 
/* ======================= Recurring Payments Routes ======================= */
 
app.get('/api/recurring-bills', (req, res) => {
  // Get userId and budgetId from query or use defaults
  const userId = req.query.userId ? parseInt(req.query.userId) : MOCK_USER_ID;
  const budgetId = req.query.budgetId
    ? parseInt(req.query.budgetId)
    : MOCK_BUDGET_ID;
 
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
 
  const userRecurringBills = recurringBills.filter(
    (bill) =>
      bill.userId === userId && (!budgetId || bill.budgetId === budgetId)
  );
 
  res.json(userRecurringBills);
});
 
/* ======================= Budget Limits Routes ======================= */
app.get('/api/budget-limits', (req, res) => {
  const userId = req.query.userId ? parseInt(req.query.userId) : MOCK_USER_ID;
  const budgetId = req.query.budgetId
    ? parseInt(req.query.budgetId)
    : MOCK_BUDGET_ID;
 
  const userBudgetLimit = budgetLimits.find(
    (limit) => limit.userId === userId && limit.budgetId === budgetId
  );
 
  if (!userBudgetLimit) {
    return res
      .status(404)
      .json({ error: 'Budget limits not found for this user and budget.' });
  }
 
  res.json(userBudgetLimit);
});
 
/* ======================= Notification Routes ======================= */
// Route to get notifications
app.get('/api/notifications', (req, res) => {
  const notifications = getNotifications();
  res.json(notifications);
});
 
// POST route for logout
app.post('/api/logout', (req, res) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }
 
  // Add the token to the blacklist
  tokenBlacklist.push(token);
  res.status(200).json({ message: 'Successfully logged out' });
});
/* ======================= Serve Frontend (React App) ======================= */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../front-end/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running... Front-end development server handles UI.');
  });
}
 
export default app;