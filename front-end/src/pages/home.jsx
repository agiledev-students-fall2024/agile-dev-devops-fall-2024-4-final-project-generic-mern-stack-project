import React, { useState } from 'react';
import Header from '../components/header';
import BudgetProgress from '../mocks/BudgetProgress.jsx';
import Notifications from '../components/notifications.jsx';
import transactionData from '../mocks/transactionData'; 
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  const { progressData, overall } = BudgetProgress();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [transactions, setTransactions] = useState([...transactionData]); 
  const [showAddTransaction, setShowAddTransaction] = useState(false); 
  const [newTransaction, setNewTransaction] = useState({
    merchant: '',
    category: '',
    amount: '',
    date: ''
  }); 

  const viewBreakdown = () => setShowBreakdown(!showBreakdown);
  const totalBudget = overall.totalBudget || 0;
  const totalSpent = overall.totalSpent || 0;
  const remainingBudget = totalBudget - totalSpent;
  const overallSpent = overall.overallSpent || 0;
  const isOverBudget = totalSpent > totalBudget;

  const sortedProgressData = [...progressData].sort((a, b) => b.spent - a.spent);

  const handleAddTransaction = () => {
    if (newTransaction.merchant && newTransaction.category && newTransaction.amount && newTransaction.date) {
      const newTransactionWithId = { 
        ...newTransaction, 
        id: transactions.length + 1, 
        amount: parseFloat(newTransaction.amount) 
      };
      setTransactions(prevTransactions => [newTransactionWithId,...prevTransactions]); 
      setShowAddTransaction(false); 
      setNewTransaction({ merchant: '', category: '', amount: '', date: '' }); // Reset form fields
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  return (
    <div className="home-container">
      <Header />
      
      <section className="budget-overview">
        <h2>Monthly Spending Progress</h2>
        <p><strong>Total Budget:</strong> ${totalSpent} / ${totalBudget}</p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${Math.min(overallSpent, 100)}%` }}>
            {Math.round(overallSpent)}% Spent
          </div>
        </div>
        
        <div className="budget-details">
          <button className="view-breakdown" onClick={viewBreakdown}>
            {showBreakdown ? 'Hide Breakdown' : 'View Breakdown'}
          </button>

          {showBreakdown && (
            <div className="budget-breakdown">
              <p><strong>Total Budget:</strong> ${totalBudget}</p>
              <p><strong>Spent:</strong> ${totalSpent}</p>
              <p><strong>Remaining:</strong> ${remainingBudget > 0 ? remainingBudget : 0}</p>
            </div>
          )}
        </div>
      </section>
      
      <Notifications />

      <section className="transactions">
        <Link to="/transactions" className="transactions-link">
          <h2 style={{ cursor: 'pointer', color: '#487bf1' }}>Transactions</h2>
        </Link>
        <button className="button" onClick={() => setShowAddTransaction(true)}>
          Add Transaction
        </button>
        <ul className="transaction-list">
          <li className="transaction-item header">
            <span>Merchant</span>
            <span>Category</span>
            <span>Amount</span>
            <span>Date</span>
          </li>
          {transactions.slice(0, 5).map((transaction) => (
            <li key={transaction.id} className="transaction-item">
              <span>{transaction.merchant}</span>
              <span>{transaction.category}</span>
              <span>${transaction.amount.toFixed(2)}</span>
              <span>{transaction.date}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Modal for Adding a New Transaction */}
      {showAddTransaction && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Transaction</h2>
            <label>
              Merchant:
              <input
                type="text"
                name="merchant"
                value={newTransaction.merchant}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={newTransaction.category}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Amount:
              <input
                type="number"
                name="amount"
                value={newTransaction.amount}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={newTransaction.date}
                onChange={handleInputChange}
              />
            </label>
            <button className="button" onClick={handleAddTransaction}>Add Transaction</button>
            <button className="button" onClick={() => setShowAddTransaction(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
