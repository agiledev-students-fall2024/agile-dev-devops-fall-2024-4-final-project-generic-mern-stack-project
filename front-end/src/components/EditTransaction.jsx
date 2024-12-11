import React, { useState } from 'react';
import './EditTransaction.css';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Import trash icon from react-icons

function EditTransaction({ transaction, onUpdateTransaction, onClose, onDeleteTransaction }) {
  const BASE_URL = process.env.REACT_APP_SERVER_HOSTNAME;

  const [updatedTransaction, setUpdatedTransaction] = useState({
    ...transaction,
    amount: transaction.amount.toString(),
    date: new Date(transaction.date).toISOString().split('T')[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTransaction({ ...updatedTransaction, [name]: value });
  };

  const handleUpdateTransaction = () => {
    const userId = localStorage.getItem('id');
    const { _id, merchant, category, amount, date } = updatedTransaction;
  
    if (merchant && category && amount && date) {
      axios.put(`${BASE_URL}/api/transactions/${_id}`, {
        userId, 
        merchant,
        category,
        amount: parseFloat(amount),
        date,
      })
      .then((res) => {
        onUpdateTransaction(res.data); 
        onClose();
      })
      .catch((err) => {
        console.error("Error updating transaction:", err);
      });
    }
  };

  const handleDeleteTransaction = () => {
    const userId = localStorage.getItem('id');
    axios.delete(`${BASE_URL}/api/transactions/${transaction._id}`, {
      data: { userId }, // Pass userId in the request body
    })
    .then(() => {
      onDeleteTransaction(transaction._id); // Notify parent component to remove the transaction
      onClose(); // Close the modal
    })
    .catch((err) => {
      console.error("Error deleting transaction:", err);
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {/* Trash Icon for Delete */}
        <FaTrash
          className="trash-icon"
          onClick={handleDeleteTransaction}
          title="Delete Transaction"
        />
        <h2>Edit Transaction</h2>
        <label>
          Merchant:
          <input
            type="text"
            name="merchant"
            value={updatedTransaction.merchant}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={updatedTransaction.category}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={updatedTransaction.amount}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={updatedTransaction.date}
            onChange={handleInputChange}
          />
        </label>
        <button className="button" onClick={handleUpdateTransaction}>Save</button>
        <button className="button cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default EditTransaction;
