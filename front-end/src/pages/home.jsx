import React, { useState, useEffect } from 'react';
import Categories from '../components/categories.jsx';
import Notifications from '../components/notifications.jsx';
import AddTransaction from '../components/AddTransaction';
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [categoryLimits, setCategoryLimits] = useState({});
  const [totalSpent, setTotalSpent] = useState(0);
  const [monthlyLimit, setMonthlyLimit] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }

    // Fetch transactions for the user
    fetch(`http://localhost:3001/api/transactions?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const sortedTransactions = (data || []).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTransactions(sortedTransactions);

        // Calculate total spent
        const spent = sortedTransactions.reduce(
          (total, transaction) => total + transaction.amount,
          0
        );
        setTotalSpent(spent);
      })
      .catch((err) => console.error('Error fetching transactions:', err));

    // Fetch budget limits for the user
    fetch(`http://localhost:3001/api/budget-limits?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setMonthlyLimit(data.monthlyLimit || 0);
        const limits = data.categories.reduce((acc, category) => {
          acc[category.name] = category.limit;
          return acc;
        }, {});
        setCategoryLimits(limits);
      })
      .catch((err) => console.error('Error fetching budget limits:', err));
  }, [userId]);

  // Calculate category totals based on transactions
  const categoryTotals = transactions.reduce((totals, transaction) => {
    const { category, amount } = transaction;
    if (!totals[category]) totals[category] = 0;
    totals[category] += amount;
    return totals;
  }, {});

  // Add "Other" category for uncategorized spending
  const categorizedSpent = Object.keys(categoryLimits).reduce(
    (sum, category) => sum + (categoryTotals[category] || 0),
    0
  );
  const otherSpent = totalSpent - categorizedSpent;

  if (otherSpent > 0) {
    categoryTotals["Other"] = otherSpent;
  }

  const handleAddTransaction = async (transaction) => {
    try {
      const response = await fetch('http://localhost:3001/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...transaction, userId }),
      });

      if (!response.ok) throw new Error('Failed to add transaction');

      const newTransaction = await response.json();
      const updatedTransactions = [newTransaction, ...transactions];
      const sortedTransactions = updatedTransactions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setTransactions(sortedTransactions);
      setShowAddTransaction(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="home-container">
      {/* Budget Overview Section */}
      <section className="budget-overview">
        <div className="budget-header">
          <h2>Monthly Spending Progress</h2>
          {showBreakdown && (
            <button className="edit-button" onClick={toggleEdit}>
              {isEditing ? 'Save' : 'Edit'}
            </button>
          )}
        </div>

        <p>
          <strong>Total Budget:</strong> ${totalSpent} / ${monthlyLimit}
        </p>

        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${Math.min((totalSpent / monthlyLimit) * 100, 100)}%`,
            }}
          >
            {Math.round((totalSpent / monthlyLimit) * 100)}% Spent
          </div>
        </div>

        <button
          className="view-breakdown"
          onClick={() => setShowBreakdown(!showBreakdown)}
        >
          {showBreakdown ? 'Hide Breakdown' : 'View Breakdown'}
        </button>

        {showBreakdown && (
          <Categories
            categoryTotals={categoryTotals}
            categoryLimits={categoryLimits}
            isEditing={isEditing}
            handleLimitChange={(category, value) => {
              setCategoryLimits((prev) => ({ ...prev, [category]: value }));
            }}
          />
        )}
      </section>

      {/* Notifications */}
      <Notifications />

      {/* Transactions Section */}
      <section className="transactions">
        <div className="transactions-header">
          <Link to="/transactions" className="transactions-link">
            <h2>Transactions</h2>
          </Link>
          <button
            id="add-transaction-button"
            onClick={() => setShowAddTransaction(true)}
          >
            +
          </button>
        </div>
        <ul className="transaction-list">
          <li className="transaction-item header">
            <span>Merchant</span>
            <span>Category</span>
            <span>Amount</span>
            <span>Date</span>
          </li>
          {transactions.slice(0, 5).map((transaction) => (
            <li key={transaction._id || transaction.id} className="transaction-item">
              <span>{transaction.merchant}</span>
              <span>{transaction.category}</span>
              <span>${transaction.amount.toFixed(2)}</span>
              <span>
                {new Date(transaction.date).toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                })}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {showAddTransaction && (
        <AddTransaction
          onAddTransaction={handleAddTransaction}
          onClose={() => setShowAddTransaction(false)}
        />
      )}
    </div>
  );
}

export default Home;
