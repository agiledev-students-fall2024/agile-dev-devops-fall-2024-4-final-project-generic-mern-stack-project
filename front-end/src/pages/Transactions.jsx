import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditTransaction from '../components/EditTransaction'; 
import AddTransaction from '../components/AddTransaction'; // Import AddTransaction component
import './Transactions.css';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editTransaction, setEditTransaction] = useState(null); // Track transaction to edit
  const [showAddTransaction, setShowAddTransaction] = useState(false); // AddTransaction modal state
  const navigate = useNavigate();

  const userId = localStorage.getItem('id');

  const getCurrentMonth = () => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[new Date().getMonth()];
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/transactions?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Sort transactions by date in descending order (most recent first)
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(sortedData);
        setFilteredTransactions(sortedData);
  
        // Extract unique categories for the dropdown
        const uniqueCategories = ["All", ...new Set(sortedData.map((transaction) => transaction.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, [userId]);

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

  const handleTransactionClick = (transaction) => {
    setEditTransaction(transaction); // Open the edit modal with the selected transaction
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    // Update the transaction list with the edited transaction
    setTransactions(transactions.map(t => t._id === updatedTransaction._id ? updatedTransaction : t));
    setFilteredTransactions(filteredTransactions.map(t => t._id === updatedTransaction._id ? updatedTransaction : t));
    setEditTransaction(null); // Close the modal
  };

  const handleDeleteTransaction = (transactionId) => {
    // Remove the transaction from the state
    setTransactions(transactions.filter(t => t._id !== transactionId));
    setFilteredTransactions(filteredTransactions.filter(t => t._id !== transactionId));
  };

  const handleAddTransaction = async (transaction) => {
    try {
      const response = await fetch('http://localhost:3001/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...transaction,
          userId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }
  
      const newTransaction = await response.json();
  
      // Update state with the new transaction and sort
      const updatedTransactions = [newTransaction, ...transactions];
      const sortedTransactions = updatedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(sortedTransactions);
      setFilteredTransactions(sortedTransactions);
      setShowAddTransaction(false); // Close the AddTransaction modal
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h2>{getCurrentMonth()} Transactions</h2>
        <button
          id="add-transaction-button"
          onClick={() => setShowAddTransaction(true)}
        >
          +
        </button>
      </div>

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
            <li
              key={transaction._id}
              className="transaction-item"
              onClick={() => handleTransactionClick(transaction)} // Open edit modal
            >
              <span>{transaction.merchant}</span>
              <span>{transaction.category}</span>
              <span>${transaction.amount.toFixed(2)}</span>
              <span>{new Date(transaction.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}</span>
            </li>
          ))}
        </ul>
      )}

      {editTransaction && (
        <EditTransaction
          transaction={editTransaction}
          onUpdateTransaction={handleUpdateTransaction}
          onDeleteTransaction={handleDeleteTransaction} // Pass delete handler
          onClose={() => setEditTransaction(null)}
        />
      )}

      {showAddTransaction && (
        <AddTransaction
          onAddTransaction={handleAddTransaction}
          onClose={() => setShowAddTransaction(false)}
        />
      )}
    </div>
  );
}

export default Transactions;
