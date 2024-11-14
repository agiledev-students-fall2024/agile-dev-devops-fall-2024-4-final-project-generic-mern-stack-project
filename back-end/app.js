// require('dotenv').config({ silent: true }) // load env variables from .env
// const express = require('express')
// const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
// const cors = require('cors') // enabling CORS requests
// const mongoose = require('mongoose')
// const path = require('path');
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import budgetLimits from './mocks/budgetLimits.js';
import recurringBills from './mocks/recurringBills.js';
import transactionData from './mocks/transactionData.js';
import goals from './mocks/goals.js';
import { getNotifications } from './notifications.js'; 

dotenv.config({ silent: true });

/* Importing mock data */
// const budgetLimits = require('./mocks/budgetLimits.js');
// const recurringBills = require('./mocks/recurringBills.js');
// const transactionData = require('./mocks/transactionData');
// const goals = require('./mocks/goals.js');

// const { getNotifications } = require('./notifications'); 


const app = express()
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors())

// parse incoming requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// temp in-memory storage for accounts and debts since no DB yet
const accounts = [];
const debts = [];

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



/* Routes for Notifications/Reminders */
app.get('/api/notifications', (req, res) => {
  const notifications = getNotifications();
  res.json(notifications);
});




app.get('/goal', (req, res) => {
  res.json(goals);
});

app.post('/goal', (req, res) => {
  const newGoal = req.body;
  newGoal.id = goals.length + 1;
  newGoal.current = 0;
  goals.push(newGoal);
  res.status(201).json({ message: 'Goal added', goal: newGoal });
});

app.get('/api/transactions', (req, res) => {
  res.json(transactionData);
});


// Serve the frontend (React app)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/", "index.html"));
});


// export the express app we created to make it available to other modules
// module.exports = app
export default app;