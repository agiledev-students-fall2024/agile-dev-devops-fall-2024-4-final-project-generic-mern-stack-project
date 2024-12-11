import './Balances.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Balances = () => {
  const [accounts, setAccounts] = useState([]);
  const [debts, setDebts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [isDebtModal, setIsDebtModal] = useState(false);
  const [newItem, setNewItem] = useState({
    type: '',
    amount: '',
    number: '',
    dueDate: '',
    paymentSchedule: '',
    totalPayments: 0,
  });

  const BASE_URL = process.env.REACT_APP_SERVER_HOSTNAME;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const responseAccounts = await axios.get(`${BASE_URL}/api/accounts`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAccounts(responseAccounts.data);

          const responseDebts = await axios.get(`${BASE_URL}/api/debts`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDebts(responseDebts.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [BASE_URL]);

  const handleAddOrEditItem = async () => {
    const token = localStorage.getItem('token');
    const route = isDebtModal ? `${BASE_URL}/api/debts` : `${BASE_URL}/api/accounts`;
    const payload = { ...newItem, amount: Number(newItem.amount) };

    if (isDebtModal) {
      const frequencyDays = getFrequencyDays(newItem.paymentSchedule);
      payload.dueDates = calculateDueDates(
        new Date(newItem.dueDate),
        frequencyDays,
        newItem.totalPayments
      );
    }

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      try {
        if (isEditing) {
          const id = isDebtModal ? debts[currentItemIndex]._id : accounts[currentItemIndex]._id;
          const response = await axios.put(`${route}/${id}`, payload, { headers });
          updateStateAfterEdit(response.data, isDebtModal);
        } else {
          const response = await axios.post(route, payload, { headers });
          updateStateAfterAdd(response.data, isDebtModal);
        }
      } catch (error) {
        console.error('Error adding/updating item:', error);
      }

      resetForm();
    } else {
      console.error('Please log in.');
    }
  };

  const calculateDueDates = (startDate, frequencyDays, totalPayments) => {
    const dueDates = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < totalPayments; i++) {
      dueDates.push(new Date(currentDate).toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + frequencyDays);
    }

    return dueDates;
  };

  const getFrequencyDays = (paymentSchedule) => {
    switch (paymentSchedule.toLowerCase()) {
      case 'bi-weekly':
        return 14;
      case 'monthly':
        return 30;
      case 'annually':
        return 365;
      default:
        throw new Error('Invalid payment schedule');
    }
  };

  const updateStateAfterEdit = (updatedItem, isDebt) => {
    if (isDebt) {
      const updatedDebts = [...debts];
      updatedDebts[currentItemIndex] = updatedItem;
      setDebts(updatedDebts);
    } else {
      const updatedAccounts = [...accounts];
      updatedAccounts[currentItemIndex] = updatedItem;
      setAccounts(updatedAccounts);
    }
  };

  const updateStateAfterAdd = (newItem, isDebt) => {
    if (isDebt) {
      setDebts([...debts, newItem]);
    } else {
      setAccounts([...accounts, newItem]);
    }
  };

  const handleDebtPayment = async (index) => {
    const token = localStorage.getItem('token');
    const debt = debts[index];

    if (token) {
      const nextDueDates = debt.dueDates.slice(1);

      try {
        const response = await axios.put(
          `${BASE_URL}/api/debts/${debt._id}`,
          { dueDates: nextDueDates, paid: nextDueDates.length === 0 ? true : false },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const updatedDebts = [...debts];
        updatedDebts[index] = response.data;
        setDebts(updatedDebts);

        if (nextDueDates.length === 0) {
          alert('Debt fully paid off!');
        } else {
          alert('Payment marked as complete! Next due date updated.');
        }
      } catch (error) {
        console.error('Error updating debt payment:', error);
      }
    } else {
      console.error('Please log in.');
    }
  };

  const resetForm = () => {
    setNewItem({ type: '', amount: '', number: '', dueDate: '', paymentSchedule: '', totalPayments: 0 });
    setShowModal(false);
    setIsEditing(false);
    setIsDebtModal(false);
  };

  return (
    <main className="Home">
      <div className="container">
        <section className="accounts-section">
          <h1>Account Balances</h1>
          {accounts.map((account, index) => (
            <div key={index}>
              <div className="account-type">
                {account.type} - XXXX{account.number}
              </div>
              <div className="account-balance">${account.amount.toLocaleString()}</div>
              <button className="edit-button" onClick={() => {/* Edit logic */}}>Edit</button>
              <button className="delete-button" onClick={() => {/* Delete logic */}}>Delete</button>
            </div>
          ))}
        </section>

        <section className="debt-section">
          <h1>Debt Management</h1>
          {debts.map((debt, index) => (
            <div key={index} className="debt">
              <div className="debt-type">{debt.type} - ${debt.amount.toLocaleString()}</div>
              <div className="debt-info">
                Remaining Due Dates: {debt.dueDates.join(', ')} <br />
                Payment Schedule: {debt.paymentSchedule}
              </div>
              <button className="edit-button" onClick={() => {/* Edit logic */}}>Edit</button>
              <button className="delete-button" onClick={() => {/* Delete logic */}}>Delete</button>
              <label>
                Paid:
                <input
                  type="checkbox"
                  checked={debt.dueDates.length === 0}
                  onChange={() => handleDebtPayment(index)}
                />
              </label>
            </div>
          ))}
        </section>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? 'Edit Debt' : 'Add New Debt'}</h2>
            <label>
              Debt Type:
              <input
                type="text"
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                placeholder="e.g., Car Loan"
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
            <button onClick={handleAddOrEditItem}>{isEditing ? 'Save Changes' : 'Add Debt'}</button>
            <button onClick={resetForm}>Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Balances;
