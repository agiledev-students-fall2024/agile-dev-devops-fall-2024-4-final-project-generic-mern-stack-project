import React, { useState, useEffect } from 'react';
import './RecurringPayments.css';

function RecurringPayments() {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [currentPaymentIndex, setCurrentPaymentIndex] = useState(null);
  const [newPayment, setNewPayment] = useState({
    name: '',
    category: '',
    amount: '',
    dueDate: ''
  });

  // fetch recurring bills from the backend
  useEffect(() => {
    fetch("http://localhost:3001/api/recurring-bills?userId=1&budgetId=1")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPayments(data);
        } else {
          console.error("Expected an array but received:", data);
          setPayments([]);
        }
      })
      .catch((error) => console.error("Failed to fetch recurring bills:", error));
  }, []);

  const handleAddOrEditPayment = () => {
    if (isEditing && currentPaymentIndex !== null) {
      const updatedPayments = [...payments];
      updatedPayments[currentPaymentIndex] = newPayment;
      setPayments(updatedPayments);
    } else {
      setPayments([...payments, newPayment]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setCurrentPaymentIndex(index);
    setNewPayment(payments[index]);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setNewPayment({ name: '', category: '', amount: '', dueDate: '' });
    setShowModal(false);
    setIsEditing(false);
    setCurrentPaymentIndex(null);
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
        {payments.map((payment, index) => (
          <li key={payment.id} className="payment-item">
            <div className="payment-details">
              <p className="payment-name">{payment.name}</p>
              <p className="payment-category">{payment.category}</p>
              <p className="payment-amount">${payment.amount}</p>
              <p className="payment-due-date">{payment.dueDate}</p>
            </div>
            <button className="edit-payment-btn" onClick={() => handleEdit(index)}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? "Edit Payment" : "Add New Payment"}</h2>
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
              <button onClick={handleAddOrEditPayment}>{isEditing ? "Save Changes" : "Add"}</button>
              <button onClick={resetForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecurringPayments;
