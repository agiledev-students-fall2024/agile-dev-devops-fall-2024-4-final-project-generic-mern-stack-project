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
console.log('MongoDB URI:', process.env.MONGODB_URI);

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
app.get("/api/accounts", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, 'accounts'); 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.accounts); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to add a new account with express validator 
app.post(
  "/api/accounts",
  authenticateToken,
  [
    body("type").notEmpty().withMessage("Account type is required"),
    body("amount").isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
    body("number").notEmpty().withMessage("Account number is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, amount, number } = req.body;

    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const newAccount = { type, amount, number };
      user.accounts.push(newAccount);
      await user.save();
      res.status(201).json(newAccount);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Route to edit an account by ID with express validator 
app.put(
  "/api/accounts/:accountId",
  authenticateToken,
  [
    body("type").optional().notEmpty().withMessage("Account type is required"),
    body("amount").optional().isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
    body("number").optional().notEmpty().withMessage("Account number is required"),
  ],
  async (req, res) => {
    const { accountId } = req.params;
    const { type, amount, number } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const account = user.accounts.id(accountId);
      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      if (type) account.type = type;
      if (amount != null) account.amount = amount;
      if (number) account.number = number;

      await user.save();
      res.json(account);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Route to delete an account by ID
app.delete('/api/accounts/:id', async (req, res) => {
  try {
    const accountId = req.params.id;

    const accountIdObject = new mongoose.Types.ObjectId(accountId);

    const user = await User.findOneAndUpdate(
      { 'accounts._id': accountIdObject }, 
      { $pull: { accounts: { _id: accountIdObject } } },  
      { new: true }  
    );

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ message: "Error deleting account" });
  }
});

/* ======================= Debt Routes ======================= */

// Route to get all debts
app.get("/api/debts", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, 'debts'); 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.debts);  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to add a new debt with express validator 
app.post(
  "/api/debts",
  authenticateToken,
  [
    body("type").notEmpty().withMessage("Debt type is required"),
    body("amount").isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
    body("dueDate").notEmpty().withMessage("Due date is required"),
    body("paymentSchedule").notEmpty().withMessage("Payment schedule is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, amount, dueDate, paymentSchedule } = req.body;

    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const newDebt = { type, amount, dueDate, paymentSchedule };
      user.debts.push(newDebt);
      await user.save();
      res.status(201).json(newDebt);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Route to edit a debt by ID with express validator 
app.put(
  "/api/debts/:debtId",
  authenticateToken,
  [
    body("type").optional().notEmpty().withMessage("Debt type is required"),
    body("amount").optional().isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
    body("dueDate").optional().notEmpty().withMessage("Due date is required"),
    body("paymentSchedule").optional().notEmpty().withMessage("Payment schedule is required"),
  ],
  async (req, res) => {
    const { debtId } = req.params;
    const { type, amount, dueDate, paymentSchedule } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const debt = user.debts.id(debtId);
      if (!debt) {
        return res.status(404).json({ error: "Debt not found" });
      }

      if (type) debt.type = type;
      if (amount != null) debt.amount = amount;
      if (dueDate) debt.dueDate = dueDate;
      if (paymentSchedule) debt.paymentSchedule = paymentSchedule;

      await user.save();
      res.json(debt);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Route to delete a debt by ID
app.delete("/api/debts/:debtId", authenticateToken, async (req, res) => {
  const { debtId } = req.params;

  try {
    const debtIdObject = new mongoose.Types.ObjectId(debtId);

    const user = await User.findOneAndUpdate(
      { 'debts._id': debtIdObject },  
      { $pull: { debts: { _id: debtIdObject } } },  
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ error: "Debt not found" });
    }

    res.status(200).json({ message: "Debt deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
app.get('/api/transactions', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const user = await User.findById(userId).select('transactions');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.transactions || []); // Return the user's transactions
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


 
// Route to add a new transaction
app.post('/api/transactions', async (req, res) => {
  const { merchant, category, amount, date, userId } = req.body;

  if (!userId || !merchant || !category || amount == null || !date) {
    return res
      .status(400)
      .json({ error: 'User ID, merchant, category, amount, and date are required.' });
  }

  try {
    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new transaction object
    const newTransaction = {
      merchant,
      category,
      amount,
      date: new Date(date), // Ensure the date is stored correctly
      _id: new mongoose.Types.ObjectId(), // Generate a unique ID for the transaction
    };

    // Add the transaction to the user's transactions array
    user.transactions.push(newTransaction);

    // Save the updated user document
    await user.save();

    // Respond with the newly added transaction
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

 
// Route to update a transaction by ID
// Route to update a transaction by ID
app.put('/api/transactions/:id', async (req, res) => {
  const { id } = req.params; // Transaction ID from the request parameters
  const { merchant, category, amount, date, userId } = req.body; // Updated data and userId

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    // Find the user and the transaction by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const transaction = user.transactions.id(id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }

    // Update the transaction fields
    if (merchant) transaction.merchant = merchant;
    if (category) transaction.category = category;
    if (amount !== undefined) transaction.amount = amount;
    if (date) transaction.date = new Date(date);

    // Save the updated user document
    await user.save();

    // Return the updated transaction
    res.status(200).json(transaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

 
// Route to delete a transaction by ID
// Route to delete a transaction by ID
app.delete('/api/transactions/:id', async (req, res) => {
  const { id } = req.params; // Transaction ID
  const { userId } = req.body; // User ID from the request body

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    // Find the user and remove the transaction by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const transactionIndex = user.transactions.findIndex(t => t._id.toString() === id);
    if (transactionIndex === -1) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }

    // Remove the transaction
    user.transactions.splice(transactionIndex, 1);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Transaction deleted successfully.' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

 
/* ======================= Recurring Payments Routes ======================= */
 

// GET all recurring payments for a user
app.get('/api/recurring-payments', authenticateToken, async (req, res) => {
    const { userId } = req.query;
  
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      const user = await User.findById(userId).select('recurringPayments');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user.recurringPayments || []);
    } catch (error) {
      console.error('Error fetching recurring payments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // POST a new recurring payment
  app.post(
    '/api/recurring-payments',
    authenticateToken,
    [
      body('name').notEmpty().withMessage('Payment name is required'),
      body('amount').isNumeric().withMessage('Amount must be a valid number'),
      body('dueDate').notEmpty().withMessage('Due date is required'),
      body('accountId').notEmpty().withMessage('Account ID is required'),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { userId, name, category, amount, dueDate, accountId } = req.body;
  
      try {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        const newPayment = {
          _id: new mongoose.Types.ObjectId(),
          name,
          category: category || 'Uncategorized',
          amount,
          dueDate,
          accountId,
        };
  
        user.recurringPayments.push(newPayment);
        await user.save();
  
        res.status(201).json(newPayment);
      } catch (error) {
        console.error('Error adding recurring payment:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  );
  
  // PUT update an existing recurring payment
  app.put(
    '/api/recurring-payments/:id',
    authenticateToken,
    [
      body('name').optional().notEmpty().withMessage('Payment name is required'),
      body('amount').optional().isNumeric().withMessage('Amount must be a valid number'),
      body('dueDate').optional().notEmpty().withMessage('Due date is required'),
      body('accountId').optional().notEmpty().withMessage('Account ID is required'),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { id } = req.params; // Recurring payment ID
      const { userId, name, category, amount, dueDate, accountId } = req.body;
  
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      try {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        const payment = user.recurringPayments.id(id);
        if (!payment) {
          return res.status(404).json({ error: 'Recurring payment not found' });
        }
  
        // Update only provided fields
        if (name) payment.name = name;
        if (category) payment.category = category;
        if (amount !== undefined) payment.amount = amount;
        if (dueDate) payment.dueDate = dueDate;
        if (accountId) payment.accountId = accountId;
  
        await user.save();
  
        res.status(200).json(payment);
      } catch (error) {
        console.error('Error updating recurring payment:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  );
  
  // DELETE a recurring payment
  app.delete('/api/recurring-payments/:id', authenticateToken, async (req, res) => {
    const { id } = req.params; // Recurring payment ID
    const { userId } = req.query; // User ID from query
  
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const paymentIndex = user.recurringPayments.findIndex((p) => p._id.toString() === id);
      if (paymentIndex === -1) {
        return res.status(404).json({ error: 'Recurring payment not found' });
      }
  
      user.recurringPayments.splice(paymentIndex, 1);
      await user.save();
  
      res.status(200).json({ message: 'Recurring payment deleted successfully' });
    } catch (error) {
      console.error('Error deleting recurring payment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
 
/* ======================= Budget Limits Routes ======================= */
app.get('/api/budget-limits', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    // Fetch the user and their budget limits
    const user = await User.findById(userId).select('budgetLimits');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user.budgetLimits); // Send the budget limits
  } catch (error) {
    console.error('Error fetching budget limits:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
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