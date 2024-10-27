import React from 'react';
import Header from '../components/header'; 
import './home.css';  

function Home() {
  return (
    <div className="home-container">
      <Header />

      <section className="budget-overview">
        <h2>Monthly Spending Progress</h2>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: '50%' }}>
            50% of Budget Spent
          </div>
        </div>
        <div className="budget-details">
          <p><strong>Total Budget:</strong> $3000</p>
          <p><strong>Spent:</strong> $1500</p>
          <p><strong>Remaining:</strong> $1500</p>
        </div>
      </section>

      <section className="notifications">
        <h2>Notifications</h2>
        <ul>
          <li>💡 Upcoming Bill: Rent - Due in 3 days</li>
          <li>💡 Upcoming Subscription: Netflix - Due in 1 day</li>
          <li>⚠️ You're nearing your monthly budget limit for Entertainment!</li>
          <li>⚠️ You haven't confirmed a subscription you've been paying for 3 months!</li>
        </ul>
      </section>

      <section className="transactions">
        <h2>Recent Transactions</h2>
        <ul className="transaction-list">
          <li className="transaction-item">
            <span>Trader Joe's</span>
            <span>$120</span>
            <span>Oct 10</span>
          </li>
          <li className="transaction-item">
            <span>Rosy's Cuisine</span>
            <span>$45</span>
            <span>Oct 12</span>
          </li>
          <li className="transaction-item">
            <span>T-Mobile</span>
            <span>$60</span>
            <span>Oct 15</span>
          </li>
          <li className="transaction-item">
            <span>Netflix</span>
            <span>$15</span>
            <span>Oct 18</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
