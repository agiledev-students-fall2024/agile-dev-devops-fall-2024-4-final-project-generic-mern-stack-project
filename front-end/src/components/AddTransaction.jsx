import React, { useState } from 'react';
import './AddTransaction.css';
import axios from 'axios';
import CategoryDropdown from './categoryDropdown';

function AddTransaction({ onAddTransaction, onClose }) {
  const BASE_URL = process.env.REACT_APP_SERVER_HOSTNAME;

  const [transaction, setTransaction] = useState({
    merchant: '',
    category: '',
    amount: '',
    date: '',
  });

  const handleInputChange = (name, value) => {
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTransaction = async () => {
    const userId = localStorage.getItem('id');
    const { merchant, category, amount, date, accountId } = transaction;
  
    if (merchant && category && amount && date && accountId) {
      try {
        // Convert local date to UTC before sending to the server
        const utcDate = new Date(date).toISOString();
  
        const response = await axios.post(`${BASE_URL}/api/transactions`, {
          merchant,
          category,
          amount: parseFloat(amount),
          date: utcDate, // Send UTC date
          accountId,
          userId,
        });
  
        onAddTransaction(response.data);
        setTransaction({
          merchant: '',
          category: '',
          amount: '',
          date: '',
          accountId: '',
        });
        onClose();
      } catch (error) {
        console.error('Error adding transaction:', error);
      }
    } else {
      alert('Please fill in all fields before submitting.');
    }
  };
  

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Transaction</h2>
        <label>
          Merchant:
          <input
            type="text"
            name="merchant"
            value={transaction.merchant}
            onChange={(e) => handleInputChange('merchant', e.target.value)}
          />
        </label>
        <label>
          Category:
          <CategoryDropdown
            selectedCategory={transaction.category}
            onChange={(value) => handleInputChange('category', value)}
            allowCustom={true}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
          />
        </label>
        <button className="button" onClick={handleAddTransaction}>
          Add
        </button>
        <button className="button cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddTransaction;
