import React, { useState } from 'react';
import Header from '../components/header';
import BudgetProgress from '../mocks/BudgetProgress.jsx';
import Notifications from '../components/notifications.jsx';
import './home.css';
import transactionData from '../mocks/transactionData';
import { Link } from 'react-router-dom';


function Home() {
  const { progressData, overall } = BudgetProgress();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const viewBreakdown = () => setShowBreakdown(!showBreakdown)
  const totalBudget = overall.totalBudget || 0;
  const totalSpent = overall.totalSpent || 0;
  const remainingBudget = totalBudget - totalSpent;
  const overallSpent = overall.overallSpent || 0;
  const isOverBudget = totalSpent > totalBudget;

  const sortedProgressData = [...progressData].sort((a, b) => b.spent - a.spent);

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
        <ul className="transaction-list">
          <li className="transaction-item header">
            <span>Merchant</span>
            <span>Category</span>
            <span>Amount</span>
            <span>Date</span>
          </li>
          {transactionData.slice(0, 5).map((transaction) => (
            <li key={transaction.id} className="transaction-item">
              <span>{transaction.merchant}</span>
              <span>{transaction.category}</span>
              <span>${transaction.amount}</span>
              <span>{transaction.date}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Home;