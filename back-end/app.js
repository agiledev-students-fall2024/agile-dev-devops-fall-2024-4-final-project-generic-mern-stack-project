// require('dotenv').config({ silent: true }); // Load env variables from .env
// const express = require('express');
// const morgan = require('morgan'); // Middleware for logging HTTP requests
// const cors = require('cors'); // Enabling CORS requests
// const path = require('path');
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// /* Importing Mock Data */
// const budgetLimits = require('./mocks/budgetLimits.js');
// const recurringBills = require('./mocks/recurringBills.js');
// const transactionData = require('./mocks/transactionData');
// const { getNotifications } = require('./notifications'); // Import notification logic

import budgetLimits from './mocks/budgetLimits.js';
import recurringBills from './mocks/recurringBills.js';
import transactionData from './mocks/transactionData.js';
import goals from './mocks/goals.js';
import { getNotifications } from './notifications.js'; 
dotenv.config({ silent: true });


/* Initialize Express App */
const app = express();

/* ======================= Middleware ======================= */
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })); // Log all requests, except in test mode
app.use(cors()); // Enable Cross-Origin Requests
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

/* ======================= Temporary Data Storage ======================= */
// Temporary in-memory storage for accounts and debts since no DB yet
const accounts = [];
const debts = [];

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

/* ======================= Debt Routes ======================= */
// Route to get all debts
app.get("/api/debts", (req, res) => {
  res.json(debts);
});

// Route to add a new debt
app.post("/api/debts", (req, res) => {
  const { type, amount, dueDate, paymentSchedule } = req.body;
  if (!type || amount == null || !dueDate || !paymentSchedule) {
    return res.status(400).json({ error: "Type, amount, due date, and payment schedule are required" });
  }
  const newDebt = { id: debts.length + 1, type, amount, dueDate, paymentSchedule };
  debts.push(newDebt);
  res.status(201).json(newDebt);
});

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

/* ======================= Notification Routes ======================= */
// Route to get notifications
app.get('/api/notifications', (req, res) => {
  const notifications = getNotifications();
  res.json(notifications);
});

/* ======================= Goal Routes ======================= */

// Route to get all goals
app.get('/goal', (req, res) => {
  res.json(goals);
});

// Route to add a new goal
app.post('/goal', (req, res) => {
  const newGoal = req.body;
  newGoal.id = goals.length + 1;
  newGoal.current = 0;
  goals.push(newGoal);
  res.status(201).json({ message: 'Goal added', goal: newGoal });
});

/* ======================= Transaction Routes ======================= */
// Route to get all transactions
app.get("/api/transactions", (req, res) => {
  res.json(transactionData);
});

// Route to add a new transaction
app.post("/api/transactions", (req, res) => {
  const { merchant, category, amount, date } = req.body;
  if (!merchant || !category || amount == null || !date) {
    return res.status(400).json({ error: "Merchant, category, amount, and date are required" });
  }
  const newTransaction = { id: transactionData.length + 1, merchant, category, amount, date };
  transactionData.push(newTransaction);
  res.status(201).json(newTransaction);
});

// Route to update a transaction by ID
app.put("/api/transactions/:id", (req, res) => {
  const { id } = req.params;
  const { merchant, category, amount, date } = req.body;
  const transactionIndex = transactionData.findIndex((transaction) => transaction.id === parseInt(id));

  if (transactionIndex === -1) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  transactions[transactionIndex] = { ...transactions[transactionIndex], merchant, category, amount, date };
  res.json(transactionData[transactionIndex]);
});

// Route to delete a transaction by ID
app.delete("/api/transactions/:id", (req, res) => {
  const { id } = req.params;
  const transactionIndex = transactionData.findIndex((transaction) => transaction.id === parseInt(id));

  if (transactionIndex === -1) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  transactionData.splice(transactionIndex, 1);
  res.status(204).send();
});

/* ======================= Serve Frontend (React App) ======================= */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/", "index.html"));
});

/* ======================= Export Express App ======================= */
export default app;