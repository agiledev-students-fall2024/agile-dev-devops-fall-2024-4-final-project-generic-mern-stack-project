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

app.get('/goals', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const user = await User.findById(userId).select('goals');
    if (!user || !user.goals) {
      return res.status(404).json({ message: 'No goals found for this user' });
    }

    res.json(user.goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

 
// Create a new goal
app.post(
  '/goals',
  [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('name').notEmpty().withMessage('Goal name is required'),
    body('targetAmount').isNumeric().withMessage('Target amount must be a number'),
    body('frequency').notEmpty().withMessage('Frequency is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, name, targetAmount, frequency } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const newGoal = {
        _id: new mongoose.Types.ObjectId(),
        name,
        targetAmount,
        frequency,
        currentAmount: 0,
      };

      user.goals.push(newGoal);
      await user.save();

      res.status(201).json({ message: 'Goal created successfully', goal: newGoal });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//update a goal
app.put('/goals/:goalId', async (req, res) => {
  const { goalId } = req.params;
  const { userId, name, targetAmount, frequency, currentAmount } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const user = await User.findOne({ _id: userId, 'goals._id': goalId });
    if (!user) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    const goal = user.goals.id(goalId);
    if (name) goal.name = name;
    if (targetAmount) goal.targetAmount = targetAmount;
    if (frequency) goal.frequency = frequency;
    if (currentAmount !== undefined) goal.currentAmount = currentAmount;

    await user.save();
    res.status(200).json({ message: 'Goal updated successfully', goal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


 
app.delete('/goals/:goalId', async (req, res) => {
  const { goalId } = req.params;
  const userId = req.query.userId || req.headers['user-id'];

  console.log('Received userId:', userId, 'and goalId:', goalId);

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const initialGoalCount = user.goals.length;
    user.goals = user.goals.filter((goal) => goal._id.toString() !== goalId);

    if (user.goals.length === initialGoalCount) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    await user.save();

    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error during goal deletion:', error);
    res.status(500).json({ error: error.message });
  }
});



 

 
// Link a transaction to a goal
app.post('/goals/:goalId/transactions', async (req, res) => {
  const { goalId } = req.params;
  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({ message: 'User ID and transaction amount are required' });
  }

  try {
    const user = await User.findOne({ _id: userId, 'goals._id': goalId });
    if (!user) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    const goal = user.goals.id(goalId);
    goal.currentAmount += amount;

    await user.save();
    res.status(200).json({ message: 'Transaction added to goal', goal });
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