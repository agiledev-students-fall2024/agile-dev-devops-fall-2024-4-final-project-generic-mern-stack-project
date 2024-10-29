import React from 'react';
import { useNavigate } from 'react-router-dom';
import transactionData from '../mocks/transactionData';
import './Transactions.css';

function Transactions() {
  const navigate = useNavigate();

  return (
    <div className="transactions-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back
      </button>
      <h2>All Transactions</h2>
      <ul className="transaction-list">
        <li className="transaction-item header">
          <span>Merchant</span>
          <span>Category</span>
          <span>Amount</span>
          <span>Date</span>
        </li>
        {transactionData.map((transaction) => (
          <li key={transaction.id} className="transaction-item">
            <span>{transaction.merchant}</span>
            <span>{transaction.category}</span>
            <span>${transaction.amount}</span>
            <span>{transaction.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
