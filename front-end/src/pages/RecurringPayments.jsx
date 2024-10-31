import React, { useState } from 'react';
import recurringBills from '../mocks/recurringBills';
import './RecurringPayments.css';
import { Link } from 'react-router-dom';

function RecurringPayments() {
  const [payments, setPayments] = useState(recurringBills);
  const [showModal, setShowModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    name: '',
    category: '',
    amount: '',
    frequency: '',
    day: '',
    date: '' // For yearly date selection
  });

  const handleAddPayment = () => {
    setPayments([...payments, newPayment]);
    setShowModal(false);
    setNewPayment({ name: '', category: '', amount: '', frequency: '', day: '', date: '' });
  };

  const handleEdit = (id) => {
    console.log(`No Backend to Edit Yet`);
  };

  const handleFrequencyChange = (e) => {
    const frequency = e.target.value;
    setNewPayment({ ...newPayment, frequency, day: '', date: '' });
  };

  // Function to format the day with suffix (1st, 2nd, 3rd, etc.)
  const formatDayWithSuffix = (day) => {
    if (!day) return '';
    const suffix = ['th', 'st', 'nd', 'rd'];
    const v = day % 100;
    return day + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
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
          <li 
            key={payment.id} 
            className="payment-item"
            onMouseEnter={() => setPayments((prev) => 
              prev.map(p => p.id === payment.id ? { ...p, showEdit: true } : p)
            )}
            onMouseLeave={() => setPayments((prev) => 
              prev.map(p => p.id === payment.id ? { ...p, showEdit: false } : p)
            )}
          >
            <div className="payment-details">
              <p className="payment-name">{payment.name}</p>
              <p className="payment-category">{payment.category}</p>
              <p className="payment-amount">${payment.amount}</p>
              <p className="payment-frequency">
                {payment.frequency === 'Yearly'
                  ? `Yearly on ${new Date(payment.date).toLocaleDateString()}`
                  : payment.frequency === 'Monthly'
                  ? `Monthly on the ${formatDayWithSuffix(payment.day)}`
                  : `Weekly on ${payment.day}`}
              </p>
            </div>
            {payment.showEdit && (
              <button 
                className="edit-payment-btn" 
                onClick={() => handleEdit(payment.id)}
              >
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Modal for Adding New Payment */}
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
              Frequency:
              <select
                value={newPayment.frequency}
                onChange={handleFrequencyChange}
              >
                <option value="">Select frequency</option>
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </label>

            {newPayment.frequency === 'Weekly' && (
              <label>
                Day of the Week:
                <select
                  value={newPayment.day}
                  onChange={(e) => setNewPayment({ ...newPayment, day: e.target.value })}
                >
                  <option value="">Select day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </label>
            )}

            {newPayment.frequency === 'Monthly' && (
              <label>
                Day of the Month:
                <input
                  type="number"
                  value={newPayment.day}
                  onChange={(e) => setNewPayment({ ...newPayment, day: e.target.value })}
                  placeholder="e.g., 15"
                />
              </label>
            )}

            {newPayment.frequency === 'Yearly' && (
              <label>
                Date:
                <input
                  type="date"
                  value={newPayment.date}
                  onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                />
              </label>
            )}

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