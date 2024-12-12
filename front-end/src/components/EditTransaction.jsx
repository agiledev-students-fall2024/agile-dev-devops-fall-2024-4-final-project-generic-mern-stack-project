import React, { useState, useEffect } from 'react';
import './EditTransaction.css';
import axios from 'axios';
import CategoryDropdown from './categoryDropdown';
import { FaTrash } from 'react-icons/fa';

function EditTransaction({ transaction, onUpdateTransaction, onClose, onDeleteTransaction }) {
  const BASE_URL = process.env.REACT_APP_SERVER_HOSTNAME;
  const [accounts, setAccounts] = useState([]);
  const [updatedTransaction, setUpdatedTransaction] = useState({
    ...transaction,
    _id: transaction._id,
    merchant: transaction.merchant || '',
    category: transaction.category || '',
    amount: transaction.amount.toString(),
    date: new Date(transaction.date).toISOString().split('T')[0],
    // If accountId is undefined in transaction, try to get it from accounts[0] when accounts are loaded
    accountId: transaction.accountId || ''
  });

  // Fetch accounts and set default account if needed
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/accounts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setAccounts(response.data);
        
        // If no accountId is set, use the first account
        if (!updatedTransaction.accountId && response.data.length > 0) {
          setUpdatedTransaction(prev => ({
            ...prev,
            accountId: response.data[0]._id
          }));
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, [BASE_URL]);

  const handleInputChange = (name, value) => {
    setUpdatedTransaction(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateTransaction = async () => {
    const userId = localStorage.getItem('id');
    const { _id, merchant, category, amount, date, accountId } = updatedTransaction;

    // Improved validation check with more specific messages
    if (!merchant?.trim()) {
      alert('Please enter a merchant name.');
      return;
    }
    if (!category?.trim()) {
      alert('Please select a category.');
      return;
    }
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    if (!date?.trim()) {
      alert('Please select a date.');
      return;
    }
    if (!accountId) {
      alert('Please select an account.');
      return;
    }

    try {
      // Convert date to UTC
      const utcDate = new Date(date).toISOString();

      const response = await axios.put(`${BASE_URL}/api/transactions/${_id}`, {
        userId,
        merchant,
        category,
        amount: parseFloat(amount),
        date: utcDate,
        accountId
      });

      const transactionData = {
        transaction: response.data,
        updatedAccount: null
      };

      onUpdateTransaction(transactionData);
      onClose();
    } catch (err) {
      console.error("Error updating transaction:", err);
      alert('Failed to update transaction. Please try again.');
    }
  };

  const handleDeleteTransaction = async () => {
    const userId = localStorage.getItem('id');
    try {
      await axios.delete(`${BASE_URL}/api/transactions/${transaction._id}`, {
        data: { userId }
      });
      onDeleteTransaction(transaction._id);
      onClose();
    } catch (err) {
      console.error("Error deleting transaction:", err);
      alert('Failed to delete transaction. Please try again.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
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
            onChange={(e) => handleInputChange('merchant', e.target.value)}
          />
        </label>
        <label>
          Category:
          <CategoryDropdown
            selectedCategory={updatedTransaction.category}
            onChange={(value) => handleInputChange('category', value)}
            allowCustom={true}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={updatedTransaction.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
          />
        </label>
        <label>
          Account:
          <select
            name="accountId"
            value={updatedTransaction.accountId || ''}
            onChange={(e) => handleInputChange('accountId', e.target.value)}
          >
            <option value="">Select an account</option>
            {accounts.map((account) => (
              <option key={account._id} value={account._id}>
                {account.type} - {account.number}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={updatedTransaction.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
          />
        </label>
        <button className="button" onClick={handleUpdateTransaction}>
          Save
        </button>
        <button className="button cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditTransaction;