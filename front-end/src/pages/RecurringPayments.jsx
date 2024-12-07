import React, { useState, useEffect } from 'react';
import './RecurringPayments.css';

function RecurringPayments() {
  const [payments, setPayments] = useState([]);
  const [accounts, setAccounts] = useState([]); // Store user accounts
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPaymentIndex, setCurrentPaymentIndex] = useState(null);
  const [newPayment, setNewPayment] = useState({
    name: '',
    category: '',
    amount: '',
    dueDate: '',
    accountId: '', // Link to an account
  });

  // Fetch recurring payments and user accounts from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentsResponse = await fetch("http://localhost:3001/api/recurring-bills");
        const paymentsData = await paymentsResponse.json();
        setPayments(Array.isArray(paymentsData) ? paymentsData : []);

        const accountsResponse = await fetch("http://localhost:3001/api/accounts");
        const accountsData = await accountsResponse.json();
        setAccounts(Array.isArray(accountsData) ? accountsData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddOrEditPayment = async () => {
    if (!newPayment.accountId) {
      alert("Please select an account.");
      return;
    }

    try {
      if (isEditing && currentPaymentIndex !== null) {
        // PUT request to update existing payment
        const updatedPayment = { ...payments[currentPaymentIndex], ...newPayment };
        const response = await fetch(
          `http://localhost:3001/api/recurring-bills/${updatedPayment.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPayment),
          }
        );

        if (response.ok) {
          const updatedPayments = [...payments];
          updatedPayments[currentPaymentIndex] = updatedPayment;
          setPayments(updatedPayments);
        } else {
          console.error("Error updating payment:", await response.json());
        }
      } else {
        // POST request to create new payment
        const response = await fetch("http://localhost:3001/api/recurring-bills", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPayment),
        });

        if (response.ok) {
          const createdPayment = await response.json();
          setPayments([...payments, createdPayment]);
        } else {
          console.error("Error adding new payment:", await response.json());
        }
      }

      resetForm();
    } catch (error) {
      console.error("Error saving payment:", error);
    }
  };

  const handleEdit = (index) => {
    setCurrentPaymentIndex(index);
    setNewPayment(payments[index]);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setNewPayment({ name: '', category: '', amount: '', dueDate: '', accountId: '' });
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
              <p className="payment-account">
                Account: {accounts.find((acc) => acc.id === payment.accountId)?.type || "N/A"}
              </p>
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
            <label>
              Account:
              <select
                value={newPayment.accountId}
                onChange={(e) => setNewPayment({ ...newPayment, accountId: e.target.value })}
              >
                <option value="">Select an Account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.type} (Balance: ${account.amount})
                  </option>
                ))}
              </select>
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
