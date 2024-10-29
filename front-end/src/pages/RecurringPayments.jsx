import React, { useState } from 'react';
import recurringBills from '../mocks/recurringBills';
import './RecurringPayments.css';
import { Link } from 'react-router-dom';

function RecurringPayments() {
  const [payments, setPayments] = useState(recurringBills);

  const handleEdit = (id) => {
    console.log(`No Backend to Edit Yet`);
  };

  return (
    <div className="recurring-payments-container">
      <header className="recurring-header">
        <h1>Recurring Payments</h1>
        <Link to="/add-recurring" className="add-payment-btn">
          + Add New Payment
        </Link>
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
              <p className="payment-due-date">{payment.dueDate}</p>
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
    </div>
  );
}

export default RecurringPayments;
