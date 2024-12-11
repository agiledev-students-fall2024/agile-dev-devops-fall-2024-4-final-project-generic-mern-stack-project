import './Balances.css';
import { useState, useEffect } from 'react';

const Balances = () => {
  const [accounts, setAccounts] = useState([]);
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
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
        amount: 15000,
        dueDates: ['2024-01-01', '2024-02-01', '2024-03-01'],
        paymentSchedule: 'Monthly',
      },
      {
        type: 'Student Loan',
        amount: 30000,
        dueDates: ['2024-06-01', '2024-12-01'],
        paymentSchedule: 'Annually',
      },
    ];

    // Set mock data
    setAccounts(mockAccounts);
    setDebts(mockDebts);
    setLoading(false);
  }, []);

  const resetForm = () => {
    setNewItem({ type: '', amount: '', number: '', dueDate: '', paymentSchedule: '', totalPayments: 0 });
    setShowModal(false);
    setIsEditing(false);
    setCurrentItemIndex(null);
    setIsDebtModal(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="Home">
      <div className="container">
        <section className="accounts-section">
          <h1>Account Balances</h1>
          {accounts.length > 0 ? (
            accounts.map((account, index) => (
              <div key={index}>
                <div className="account-type">
                  {account.type} - XXXX{account.number}
                </div>
                <div className="account-balance">${account.amount.toLocaleString()}</div>
                <button
                  className="edit-button"
                  onClick={() => {
                    setCurrentItemIndex(index);
                    setIsEditing(true);
                    setIsDebtModal(false);
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
            ))
          ) : (
            <p>No accounts added yet.</p>
          )}
        </section>

        <section className="debt-section">
          <h1>Debt Management</h1>
          {debts.length > 0 ? (
            debts.map((debt, index) => (
              <div key={index}>
                <div className="debt-type">
                  {debt.type} - ${debt.amount.toLocaleString()}
                </div>
                <div className="debt-info">
                  Remaining Due Dates: {debt.dueDates.join(', ')}
                  <br />
                  Payment Schedule: {debt.paymentSchedule}
                </div>
                <button
                  className="edit-button"
                  onClick={() => {
                    setCurrentItemIndex(index);
                    setIsEditing(true);
                    setIsDebtModal(true);
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
                <label>
                  Paid:
                  <input
                    type="checkbox"
                    checked={debt.dueDates.length === 0}
                    onChange={() => {
                      const updatedDebts = [...debts];
                      updatedDebts[index].dueDates = updatedDebts[index].dueDates.slice(1);
                      setDebts(updatedDebts);
                    }}
                  />
                </label>
              </div>
            ))
          ) : (
            <p>No debts added yet.</p>
          )}
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
                placeholder="e.g., 5000"
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
            <button
              onClick={() => {
                const updatedData = [...(isDebtModal ? debts : accounts)];
                if (isEditing) {
                  updatedData[currentItemIndex] = { ...newItem };
                } else {
                  updatedData.push({ ...newItem });
                }
                isDebtModal ? setDebts(updatedData) : setAccounts(updatedData);
                resetForm();
              }}
            >
              {isEditing ? 'Save Changes' : 'Add'}
            </button>
            <button onClick={resetForm}>Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Balances;
