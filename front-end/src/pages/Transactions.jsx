import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Transactions.css';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const userId = localStorage.getItem('id');

  // Get the current month name
  const getCurrentMonth = () => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[new Date().getMonth()];
  };

  useEffect(() => {
    // Fetch transactions from the backend
    fetch(`http://localhost:3001/api/transactions?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        setTransactions(data);
        setFilteredTransactions(data); // Initialize filtered transactions
        // Extract unique categories from transactions
        const uniqueCategories = ["All", ...new Set(data.map(transaction => transaction.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error("Error fetching transactions:", err));
  }, []);

  // Handle category selection and filter transactions
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter(transaction => transaction.category === category);
      setFilteredTransactions(filtered);
    }
  };

  return (
    <div className="transactions-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back
      </button>
      <h2>{getCurrentMonth()} Transactions</h2>

      {/* Category Filter Dropdown (conditionally rendered) */}
      {filteredTransactions.length > 0 && (
        <>
          <label htmlFor="categoryFilter">Filter by Category:</label>
          <select 
            id="categoryFilter" 
            value={selectedCategory} 
            onChange={handleCategoryChange}
            className="category-filter"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </>
      )}

      {/* Transactions List */}
      {filteredTransactions.length === 0 ? (
        <p className="no-transactions-message">Nothing here yet</p>
      ) : (
        <ul className="transaction-list">
          <li className="transaction-item header">
            <span>Merchant</span>
            <span>Category</span>
            <span>Amount</span>
            <span>Date</span>
          </li>
          {filteredTransactions.map((transaction) => (
            <li key={transaction.id} className="transaction-item">
              <span>{transaction.merchant}</span>
              <span>{transaction.category}</span>
              <span>${transaction.amount.toFixed(2)}</span>
              <span>{transaction.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Transactions;
