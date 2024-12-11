import './Balances.css';
import { useState, useEffect } from 'react';

const Balances = () => {
  const [accounts, setAccounts] = useState([]);
  const [debts, setDebts] = useState([]);
  const [previousDebts, setPreviousDebts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDebtModal, setIsDebtModal] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [newItem, setNewItem] = useState({
    type: '',
    amount: '',
    number: '',
    dueDate: '',
    paymentSchedule: '',
    totalPayments: 0,
  });

  useEffect(() => {
    // Mock data for accounts and debts
    const mockAccounts = [
      { type: 'Savings', number: '1234', amount: 5000 },
      { type: 'Checking', number: '5678', amount: 2000 },
    ];

    const mockDebts = [
      {
        type: 'Car Loan',
        amount: 20000,
        dueDates: ['2025-01-12', '2025-02-12', '2025-03-12'],
        paymentSchedule: 'Monthly',
        totalPayments: 20,
      },
      {
        type: 'Student Loan',
        amount: 30000,
        dueDates: ['2025-06-12', '2026-06-12'],
        paymentSchedule: 'Annually',
        totalPayments: 2,
      },
    ];

    setAccounts(mockAccounts);
    setDebts(mockDebts);
  }, []);

  const resetForm = () => {
    setNewItem({ type: '', amount: '', number: '', dueDate: '', paymentSchedule: '', totalPayments: 0 });
    setShowModal(false);
    setIsEditing(false);
    setCurrentItemIndex(null);
    setIsDebtModal(false);
  };

  const handleDebtPayment = (index, paidFromAccount) => {
    const updatedDebts = [...debts];
    const debt = updatedDebts[index];

    if (debt.dueDates.length > 0) {
      const [nextDueDate, ...remainingDates] = debt.dueDates;

      // Calculate the payment amount per installment
      const paymentAmount = debt.amount / (debt.totalPayments || debt.dueDates.length);

      // Update debt's amount and due dates
      if (remainingDates.length === 0) {
        // Move to previous debts if fully paid
        setPreviousDebts([...previousDebts, debt]);
        updatedDebts.splice(index, 1);
      } else {
        debt.dueDates = remainingDates;
        debt.amount = Math.max(0, debt.amount - paymentAmount); // Reduce the debt amount
      }

      // Deduct the payment amount from the selected account
      const updatedAccounts = [...accounts];
      const accountIndex = updatedAccounts.findIndex((account) => account.type === paidFromAccount);
      if (accountIndex !== -1) {
        updatedAccounts[accountIndex].amount = Math.max(
          0,
          updatedAccounts[accountIndex].amount - paymentAmount
        );
        alert(
          `Payment of $${paymentAmount.toFixed(2)} made from ${paidFromAccount}. Next due date: ${
            nextDueDate || 'N/A'
          }`
        );
      }

      setAccounts(updatedAccounts);
      setDebts(updatedDebts);
    }
  };

  const addOrEditItem = () => {
    if (isDebtModal) {
      const updatedDebts = [...debts];
      if (isEditing) {
        updatedDebts[currentItemIndex] = { ...newItem };
      } else {
        updatedDebts.push({
          ...newItem,
          dueDates: calculateDueDates(newItem.dueDate, newItem.paymentSchedule, newItem.totalPayments),
        });
      }
      setDebts(updatedDebts);
    } else {
      const updatedAccounts = [...accounts];
      if (isEditing) {
        updatedAccounts[currentItemIndex] = { ...newItem };
      } else {
        updatedAccounts.push(newItem);
      }
      setAccounts(updatedAccounts);
    }
    resetForm();
  };

  const calculateDueDates = (startDate, frequency, totalPayments) => {
    const dueDates = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < totalPayments; i++) {
      dueDates.push(currentDate.toISOString().split('T')[0]);
      if (frequency === 'Bi-weekly') currentDate.setDate(currentDate.getDate() + 14);
      if (frequency === 'Monthly') currentDate.setMonth(currentDate.getMonth() + 1);
      if (frequency === 'Annually') currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    return dueDates;
  };

  return (
    <main className="Home">
      <div className="container">
        <section className="accounts-section">
          <h1>Account Balances</h1>
          {accounts.map((account, index) => (
            <div key={index} className="account-item">
              <div className="account-type">
                <strong>{account.type}</strong> - XXXX{account.number}
              </div>
              <div className="account-balance">${account.amount.toLocaleString()}</div>
              <button
                className="edit-button"
                onClick={() => {
                  setCurrentItemIndex(index);
                  setIsEditing(true);
                  setIsDebtModal(false);
                  setNewItem(account);
                  setShowModal(true);
                }}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => {
                  const updatedAccounts = [...accounts];
                  updatedAccounts.splice(index, 1);
                  setAccounts(updatedAccounts);
                }}
              >
                Delete
              </button>
            </div>
          ))}
          <div className="add-accounts">
            <button
              className="add-more-button"
              onClick={() => {
                setIsDebtModal(false);
                setShowModal(true);
              }}
            >
              Add More Accounts
            </button>
          </div>
        </section>

        <section className="debt-section">
          <h1>Debt Management</h1>
          {debts.map((debt, index) => (
            <div key={index} className="debt-item">
              <div>
                <strong>{debt.type}</strong> - <span className="debt-amount">${debt.amount.toLocaleString()}</span>
                <br />
                <strong>Payment Schedule:</strong> {debt.paymentSchedule}
                <br />
                <strong>Remaining Due Dates:</strong> {debt.dueDates.join(', ')}
              </div>
              <label className="debt-paid-label">
                <strong>Paid:</strong>
                <input
                  type="checkbox"
                  className="paid-checkbox"
                  onChange={() => handleDebtPayment(index, 'Savings')} // Replace 'Savings' with dynamic account selection
                />
              </label>
              <button
                className="edit-button"
                onClick={() => {
                  setCurrentItemIndex(index);
                  setIsEditing(true);
                  setIsDebtModal(true);
                  setNewItem(debt);
                  setShowModal(true);
                }}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => {
                  const updatedDebts = [...debts];
                  updatedDebts.splice(index, 1);
                  setDebts(updatedDebts);
                }}
              >
                Delete
              </button>
            </div>
          ))}
          <div className="add-debt">
            <button
              className="add-more-button"
              onClick={() => {
                setIsDebtModal(true);
                setShowModal(true);
              }}
            >
              Add More Debt
            </button>
          </div>
        </section>

        <section className="previous-debts-section">
          <h1>Previous Debts</h1>
          {previousDebts.map((debt, index) => (
            <div key={index} className="previous-debt-item">
              <strong>{debt.type}</strong> - ${debt.amount.toLocaleString()}
            </div>
          ))}
        </section>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? (isDebtModal ? 'Edit Debt' : 'Edit Account') : (isDebtModal ? 'Add New Debt' : 'Add New Account')}</h2>
            <label>
              {isDebtModal ? 'Debt Type:' : 'Account Type:'}
              <input
                type="text"
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                placeholder={isDebtModal ? 'e.g., Car Loan' : 'e.g., Savings'}
              />
            </label>
            <label>
              Amount:
              <input
                type="number"
                value={newItem.amount}
                onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                placeholder="e.g., 20000"
              />
            </label>
            {isDebtModal && (
              <>
                <label>
                  Payment Schedule:
                  <select
                    value={newItem.paymentSchedule}
                    onChange={(e) => setNewItem({ ...newItem, paymentSchedule: e.target.value })}
                  >
                    <option value="">Select Frequency</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Annually">Annually</option>
                  </select>
                </label>
                <label>
                  Total Payments:
                  <input
                    type="number"
                    value={newItem.totalPayments}
                    onChange={(e) => setNewItem({ ...newItem, totalPayments: e.target.value })}
                    placeholder="e.g., 20"
                  />
                </label>
                <label>
                  First Due Date:
                  <input
                    type="date"
                    value={newItem.dueDate}
                    onChange={(e) => setNewItem({ ...newItem, dueDate: e.target.value })}
                  />
                </label>
              </>
            )}
            <button onClick={addOrEditItem}>{isEditing ? 'Save Changes' : 'Add'}</button>
            <button onClick={resetForm}>Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Balances;
