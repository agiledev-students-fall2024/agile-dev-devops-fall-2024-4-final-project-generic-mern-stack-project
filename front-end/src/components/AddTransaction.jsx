import React, { useState } from 'react';
import './AddTransaction.css';
import axios from 'axios';


function AddTransaction({ onAddTransaction, onClose }) {

  const BASE_URL = process.env.REACT_APP_SERVER_HOSTNAME; 

  const [transaction, setTransaction] = useState({
    merchant: '',
    category: '',
    amount: '',
    date: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleAddTransaction = () => {
    const userId = localStorage.getItem('id'); // Retrieve the logged-in user's ID
    const { merchant, category, amount, date } = transaction;
  
    if (merchant && category && amount && date) {
      // Send the transaction to the backend
      axios
        .post(`${BASE_URL}/api/transactions`, {
          ...transaction,
          amount: parseFloat(amount),
          userId, // Include userId in the request body
        })
        .then((res) => {
          const newTransaction = res.data;
  
          // Notify the parent component of the new transaction
          onAddTransaction(newTransaction);
          setTransaction({ merchant: '', category: '', amount: '', date: '' });
          onClose();
        })
        .catch((err) => {
          console.error('Error adding transaction:', err);
        });
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
            onChange={handleInputChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={transaction.category}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleInputChange}
          />
        </label>
        <button className="button" onClick={handleAddTransaction}>Add</button>
        <button className="button cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AddTransaction;
