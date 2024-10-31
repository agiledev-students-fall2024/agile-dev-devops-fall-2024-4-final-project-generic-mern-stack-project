import React, { useState } from 'react';
import recurringBills from '../mocks/recurringBills';
import './RecurringPayments.css';

function RecurringPayments() {
  const [payments, setPayments] = useState(recurringBills);
  const [showModal, setShowModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    name: '',
    category: '',
    amount: '',
    dueDate: ''
  });

  const handleAddPayment = () => {
    setPayments([...payments, newPayment]);
    setShowModal(false);
    setNewPayment({ name: '', category: '', amount: '', dueDate: '' });
  };

  return (
    <div className="recurring-payments-container">
      <header className="recurring-header">
        <h1>Recurring Payments</h1>
        <button onClick={() => setShowModal(true)} className="add-payment-btn">
          + Add New Payment
        </button>
      </header>
      
      <ul className="payments-list">
        {payments.map((payment) => (
          <li key={payment.id} className="payment-item">
            <div className="payment-details">
              <p className="payment-name">{payment.name}</p>
              <p className="payment-category">{payment.category}</p>
              <p className="payment-amount">${payment.amount}</p>
              <p className="payment-due-date">{payment.dueDate}</p>
            </div>
            <button className="edit-payment-btn" onClick={() => console.log("Edit Payment")}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Recurring Payment</h2>
            <label>
              Name:
              <input
                type="text"
                value={newPayment.name}
                onChange={(e) => setNewPayment({ ...newPayment, name: e.target.value })}
                placeholder="e.g., Rent"
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                value={newPayment.category}
                onChange={(e) => setNewPayment({ ...newPayment, category: e.target.value })}
                placeholder="e.g., Bills"
              />
            </label>
            <label>
              Amount ($):
              <input
                type="number"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({ ...newPayment, amount: parseFloat(e.target.value) })}
                placeholder="e.g., 1500"
              />
            </label>
            <label>
              Day of the Month Due:
              <input
                type="text"
                value={newPayment.dueDate}
                onChange={(e) => setNewPayment({ ...newPayment, dueDate: e.target.value })}
                placeholder="e.g., Monthly on 15th"
              />
            </label>
            <div className="modal-buttons">
              <button onClick={handleAddPayment}>Add</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecurringPayments;