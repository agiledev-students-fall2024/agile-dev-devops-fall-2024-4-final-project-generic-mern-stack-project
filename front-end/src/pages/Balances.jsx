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
    paymentSchedule: ''
  });

  // Base URL from environment variable
  const BASE_URL = process.env.REACT_APP_SERVER_HOSTNAME;

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const responseAccounts = await axios.get(`${BASE_URL}/api/accounts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAccounts(responseAccounts.data);

        const responseDebts = await axios.get(`${BASE_URL}/api/debts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDebts(responseDebts.data);
      } catch (error) {
        console.error("Error fetching updated data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Ensure it triggers after accounts or debts update
  

  const handleAddOrEditItem = () => {
    const token = localStorage.getItem('token');
    const route = isDebtModal ? `${BASE_URL}/api/debts` : `${BASE_URL}/api/accounts`;
    const payload = { ...newItem, amount: Number(newItem.amount) };
  
    if (token) {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
  
      if (isEditing) {
        const id = isDebtModal ? debts[currentItemIndex]._id : accounts[currentItemIndex]._id;
        axios.put(`${route}/${id}`, payload, { headers })
          .then(response => {
            if (isDebtModal) {
              const updatedDebts = [...debts];
              updatedDebts[currentItemIndex] = response.data;
              setDebts(updatedDebts);
            } else {
              const updatedAccounts = [...accounts];
              updatedAccounts[currentItemIndex] = response.data;
              setAccounts(updatedAccounts);
            }
          })
          .catch(err => console.error("Error updating item:", err));
      } else {
        axios.post(route, payload, { headers })
          .then(response => {
            if (isDebtModal) {
              setDebts([...debts, response.data]);
            } else {
              setAccounts([...accounts, response.data]);
            }
            // After adding the new account, re-fetch the data to ensure everything is in sync
            fetchData();
          })
          .catch(err => console.error("Error adding item:", err));
      }
      resetForm();
    } else {
      console.error("Please log in.");
    }
  };

  const handleDeleteItem = (index, isDebt) => {
    const token = localStorage.getItem('token');
    const route = isDebt ? `${BASE_URL}/api/debts` : `${BASE_URL}/api/accounts`;

    // Ensure you're accessing the correct _id
    const id = isDebt ? debts[index]._id : accounts[index]._id;

    if (token) {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      axios.delete(`${route}/${id}`, { headers })
        .then(() => {
          if (isDebt) {
            // Delete the item from the local state using the _id
            const updatedDebts = debts.filter(debt => debt._id !== id);
            setDebts(updatedDebts);
          } else {
            // Delete the item from the local state using the _id
            const updatedAccounts = accounts.filter(account => account._id !== id);
            setAccounts(updatedAccounts);
          }
        })
        .catch(err => console.error("Error deleting item:", err));
    } else {
      console.error("No token found. Please log in.");
    }
  };

  const handleEditItem = (index, isDebt) => {
    if (isDebt) {
      setNewItem(debts[index]);
      setCurrentItemIndex(index);
      setIsDebtModal(true);
    } else {
      setNewItem(accounts[index]);
      setCurrentItemIndex(index);
      setIsDebtModal(false);
    }
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setNewItem({ type: '', amount: '', number: '', dueDate: '', paymentSchedule: '' });
    setShowModal(false);
    setIsEditing(false);
    setIsDebtModal(false);
  };

  const handlePlaidButtonClick = () => {
    alert("This button doesn't work yet!");
  };

  return (
    <main className="Home">
      <div className="container">
        <section className="accounts-section">
          <h1>Account Balances</h1>
          <p>View and edit all bank account information below</p>
          {accounts.length > 0 ? (
            accounts.map((account, index) => (
              <div key={index}>
                <div className="account-type">
                  {account.type} - XXXX{account.number}
                </div>
                <div className="account-balance">
                  $ {account.amount.toLocaleString()}
                </div>
                <button className="edit-button" onClick={() => handleEditItem(index, false)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteItem(index, false)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No accounts added yet.</p>
          )}
          <div className="add-accounts">
            <button className="add-more-button" onClick={() => { setShowModal(true); setIsDebtModal(false) }}>
              Add More Accounts
            </button>
            <button className="plaid-button" onClick={handlePlaidButtonClick}>
              Link Account with Plaid
            </button>
          </div>
        </section>

        <section className="debt-section">
          <h1>Debt Management</h1>
          <p>View and edit all debt you have below</p>
          {debts.length > 0 ? (
            debts.map((debt, index) => (
              <div key={index} className="debt">
                <div className="debt-type">
                  {debt.type} - ${debt.amount.toLocaleString()}
                </div>
                <div className="debt-info">
                  Due Date: {debt.dueDate} <br />
                  Payment Schedule: {debt.paymentSchedule}
                </div>
                <button className="edit-button" onClick={() => handleEditItem(index, true)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteItem(index, true)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No debts added yet.</p>
          )}
          <div className="add-debt">
            <button className="add-more-button" onClick={() => { setShowModal(true); setIsDebtModal(true) }}>
              Add More Debt
            </button>
          </div>
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
                placeholder={isDebtModal ? "e.g., Car Loan" : "e.g., Checking"}
              />
            </label>
            {!isDebtModal && (
              <label>
                Last 4 Digits of Account Number:
                <input
                  type="text"
                  value={newItem.number}
                  onChange={(e) => setNewItem({ ...newItem, number: e.target.value })}
                  placeholder="e.g., 1234"
                />
              </label>
            )}
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
                  Due Date:
                  <input
                    type="date"
                    value={newItem.dueDate}
                    onChange={(e) => setNewItem({ ...newItem, dueDate: e.target.value })}
                  />
                </label>
                <label>
                  Payment Schedule:
                  <input
                    type="text"
                    value={newItem.paymentSchedule}
                    onChange={(e) => setNewItem({ ...newItem, paymentSchedule: e.target.value })}
                  placeholder="e.g., Monthly"
                />
                </label>
              </>
            )}
            <div className="modal-buttons">
              <button onClick={handleAddOrEditItem}>{isEditing ? 'Save Changes' : 'Add'}</button>
              <button onClick={resetForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Balances;