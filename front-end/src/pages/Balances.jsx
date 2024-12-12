import './Balances.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
 
const Balances = () => {
  const [accounts, setAccounts] = useState([]);
  const [debts, setDebts] = useState([]);
  const [paidDebts, setpaidDebts] = useState([]);
  //const [updateDebt, setupdateDebt] = useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [isDebtModal, setIsDebtModal] = useState(false);

  const [newItem, setNewItem] = useState({
    type: '',
    amount: '',
    paidAmount: 0,
    dueDate: '', // the debt due date.
    paymentSchedule: 'Monthly', // Options: 'Bi-weekly', 'Monthly', 'Annually'
    ispaidIncurrentPeriod: false, // to show if it is paid for the current period.
    accountId: null,
  });
 
  const [selectedAccount, setSelectedAccount] = useState(null);
 
  //const [showAccountDropdown, setShowAccountDropdown] = useState(null);
 
  const BASE_URL = process.env.REACT_APP_SERVER_HOSTNAME;
 
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
        // Split debts into two groups
        const alldebts = responseDebts.data;
        const debts = alldebts.filter(
          (alldebt) => alldebt.amount > alldebt.paidAmount
        );
        const paidDebts = alldebts.filter(
          (alldebt) => alldebt.amount <= alldebt.paidAmount
        );
 
        // Set state for the two groups
        setDebts(debts);
        setpaidDebts(paidDebts);
      } catch (error) {
        console.error('Error fetching updated data:', error);
      }
    }
  };
 
  useEffect(() => {
    fetchData();
  }, []); 

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };


  const handleAddOrEditItem = () => {
    resetMessage();
    const token = localStorage.getItem('token');

    const route = isDebtModal ? `${BASE_URL}/api/debts` : `${BASE_URL}/api/accounts`;
  
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
 
      if (isEditing) {
        const id = isDebtModal ? debts[currentItemIndex]._id : accounts[currentItemIndex]._id;

        if (isDebtModal) {
          newItem.totalPayments = newItem.totalPayments || debts[currentItemIndex].dueDates.length;
        }

        axios.put(`${route}/${id}`, newItem, { headers })
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
            fetchData(); 
          })
 
          .catch((err) => console.error('Error updating item:', err));
        console.log(debts);
      } else {


        if (isDebtModal) {
          newItem.totalPayments = newItem.totalPayments || debts[currentItemIndex].dueDates.length;
        }
        
        axios.post(route, newItem, { headers })
          .then(response => {
            if (isDebtModal) {
              setDebts([...debts, response.data]);
            } else {
              setAccounts([...accounts, response.data]);
            }
            fetchData();
          })
          .catch((err) => console.error('Error adding item:', err));
      }
      resetForm();
    } else {
      console.error('Please log in.');
    }
  };
 
  const handleAccountChange = (event, index) => {
    const updatedDebts = [...debts];
    updatedDebts[index] = {
      ...updatedDebts[index],
      accountId: event.target.value,
    };
    setDebts(updatedDebts);
  };
 
  const handleAccountSelection = (event, index) => {
    handleAccountChange(event, index);
 
    // Find the selected account
    const selectedAccount = accounts.find(
      (account) => account._id === event.target.value
    );
 
    if (selectedAccount) {
      alert(
        `Debt of ${debts[index].type} paid from account type ${selectedAccount.type} with number ${selectedAccount.number}`
      );
    } else {
      alert('Selected account not found.');
    }
  };
 
  const handlePaidBoxChange = (event, index) => {
    const updatedDebts = [...debts];
    updatedDebts[index] = {
      ...updatedDebts[index],
      ispaidIncurrentPeriod: event.target.value,
    };
    setDebts(updatedDebts);
  };
 
  const handleTogglePaid = (event, index) => {
    const token = localStorage.getItem('token');
    const debt = debts[index];
 
    if (!debt) {
      console.error('Debt not found at index:', index);
      return;
    }
 
    if (!debt.accountId) {
      setErrorMessage('account associated with the payment is not selected.');
      setMessage('');
      return;
    }
    handlePaidBoxChange(event, index);
    resetMessage();
    let nextPayment = calculatePayment(
      debt.amount,
      debt.dueDate,
      debt.paymentSchedule
    );
 
    if (debt.amount - debt.paidAmount <= nextPayment)
      nextPayment = debt.amount - debt.paidAmount;
 
    let newItem;
    if (event.target.checked) {
      newItem = {
        ...debt,
        paidAmount: debt.paidAmount + nextPayment,
        ispaidIncurrentPeriod: true,
      };
    } else {
      newItem = {
        ...debt,
        paidAmount: debt.paidAmount - nextPayment,
        ispaidIncurrentPeriod: false,
      };
    }
 
    // setNewItem(newItem);
 
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
 
      // Wrapping everything in an async function
      const updateDebtAndAccount = async () => {
        try {
          // Update debt in the database
          const debtResponse = await axios.put(
            `${BASE_URL}/api/debts/${debt._id}`,
            newItem,
            {
              headers,
              validateStatus: (status) => status >= 200 && status < 300,
            }
          );
 
          // Check debt update response
          if (debtResponse.status >= 200 && debtResponse.status < 300) {
            const updatedDebts = [...debts];
            updatedDebts[index] = newItem;
            setDebts(updatedDebts);
            setMessage(
              debtResponse.data.message || 'Debt updated successfully.'
            );
            setErrorMessage('');
          } else {
            console.error('Failed to update debt: ', debtResponse);
            setErrorMessage('Failed to update debt.');
            setMessage('');
          }
 
          // Proceed with account update if debt update was successful
          const accountToUpdate = accounts.find(
            (account) => account._id === newItem.accountId
          );
 
          if (accountToUpdate) {
            const updatedAccount = {
              ...accountToUpdate,
              amount: newItem.ispaidIncurrentPeriod
                ? accountToUpdate.amount - nextPayment
                : accountToUpdate.amount + nextPayment,
            };
 
            const accountResponse = await axios.put(
              `${BASE_URL}/api/accounts/${updatedAccount._id}`,
              updatedAccount,
              {
                headers,
                validateStatus: (status) => status >= 200 && status < 300,
              }
            );
 
            // Check account update response
            if (accountResponse.status >= 200 && accountResponse.status < 300) {
              const updatedAccounts = accounts.map((account) =>
                account._id === updatedAccount._id ? updatedAccount : account
              );
              setAccounts(updatedAccounts);
              setMessage(
                accountResponse.data.message || 'Account updated successfully.'
              );
              setErrorMessage('');
            } else {
              console.error('Failed to update account: ', accountResponse);
              setErrorMessage('Failed to update account.');
              setMessage('');
            }
          } else {
            console.error('Account to update not found.');
            setErrorMessage('Account to update not found.');
            setMessage('');
          }
        } catch (err) {
          console.error('Error:', err.response || err.message || err);
          setErrorMessage('An unexpected error occurred.');
          setMessage('');
        }
      };
 
      updateDebtAndAccount(); // Call the async function
    } else {
      console.error('Token is missing.');
      setErrorMessage('Authentication token is missing.');
      setMessage('');
    }
  };
 
  //-----------------------------------
  const handleDeleteItem = (index, isDebt) => {
    resetMessage();
    const token = localStorage.getItem('token');
    const route = isDebt ? `${BASE_URL}/api/debts` : `${BASE_URL}/api/accounts`;
 
    const id = isDebt ? debts[index]._id : accounts[index]._id;
 
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
 
      axios
        .delete(`${route}/${id}`, { headers })
        .then(() => {
          if (isDebt) {
            const updatedDebts = debts.filter((debt) => debt._id !== id);
            setDebts(updatedDebts);
          } else {
            const updatedAccounts = accounts.filter(
              (account) => account._id !== id
            );
            setAccounts(updatedAccounts);
          }
        })
        .catch((err) => console.error('Error deleting item:', err));
    } else {
      console.error('No token found. Please log in.');
    }
  };
 
  const resetForm = () => {
    setNewItem({
      type: '',
      amount: '',
      paidAmount: 0,
      dueDate: '', // the debt due date.
      paymentSchedule: 'Monthly', // Options: 'Bi-weekly', 'Monthly', 'Annually'
      ispaidIncurrentPeriod: false, // to show if it is paid for the current period.
      accountId: null,
    });
    setShowModal(false);
    setIsEditing(false);
    setIsDebtModal(false);
  };
  const resetMessage = () => {
    setMessage('');
    setErrorMessage('');
  };
  const handleEditItem = (index, isDebt) => {
    resetMessage();
    if (isDebt) {
      setNewItem({
        ...debts[index],
        amount: debts[index].amount.toFixed(2), 
      });
      setCurrentItemIndex(index);
      setIsDebtModal(true);
    } else {
      setNewItem({
        ...accounts[index],
        amount: accounts[index].amount.toFixed(2),
      });
      setCurrentItemIndex(index);
      setIsDebtModal(false);
    }
    setIsEditing(true);
    setShowModal(true);
  };


  const resetForm = () => {
    setNewItem({ 
      type: '', 
      amount: '', 
      number: '', 
      dueDate: '', 
      paymentSchedule: '', 
      totalPayments: '' 
    });
    setShowModal(false);
    setIsEditing(false);
    setIsDebtModal(false);
  };


  const handleTogglePaid = async (debtId, dateIndex) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }
  
    const dueDate = debts.find(debt => debt._id === debtId)?.dueDates[dateIndex];
    if (!dueDate) {
      alert('Due date not found.');
      return;
    }
  
    try {
      const selectedAccountId = dueDate.isPaid 
        ? promptAccountSelection(accounts, 'Select an account to deposit the previously paid amount:') 
        : promptAccountSelection(accounts, 'Select an account to pay from:');
  
      if (!selectedAccountId) {
        alert('Operation cancelled.');
        return;
      }
  
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
  
      const response = await axios.put(
        `${BASE_URL}/api/debts/${debtId}/dueDates/${dateIndex}`,
        { accountId: selectedAccountId, isUndo: dueDate.isPaid },
        { headers }
      );
  
      console.log('Debt updated successfully:', response.data);
      fetchData();
    } catch (error) {
      console.error('Error updating due date status:', error);
    }
  };

  const promptAccountSelection = (accounts, message) => {
    if (!accounts || accounts.length === 0) {
      alert('No accounts available.');
      return null;
    }
  
    const accountOptions = accounts
      .map((account, index) => `${index + 1}: ${account.type} - ${formatCurrency(account.amount)}`)
      .join('\n');
  
    const selectedOption = prompt(
      `${message}\n${accountOptions}\nEnter the number corresponding to your choice:`
    );
  
    const selectedIndex = parseInt(selectedOption, 10) - 1;
    if (selectedIndex >= 0 && selectedIndex < accounts.length) {
      return accounts[selectedIndex]._id;
    } else {
      alert('Invalid selection.');
      return null;
    }
  };


  return (
    <main className="Home">
      <div className="container">
        {/* Accounts and debts sections go here */}
        <section className="accounts-section">
          <h1>Account Balances</h1>
          <p>View and edit all bank account information below</p>
          {accounts.length > 0 ? (
            accounts.map((account, index) => (
              <div key={account.id}>
                <div className="account-type">
                  {account.type} - XXXX{account.number}
                </div>
                <div className="account-balance">
                  {formatCurrency(account.amount)}
                </div>
                <button
                  className="edit-button"
                  onClick={() => handleEditItem(index, false)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteItem(index, false)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No accounts added yet.</p>
          )}
          <div className="add-accounts">
            <button
              className="add-more-button"
              onClick={() => {
                setShowModal(true);
                setIsDebtModal(false);
              }}
            >
              Add More Accounts
            </button>
          </div>
        </section>

        <section className="debt-section">
          <h1>Debt Management</h1>
          <p>View and manage your debts below:</p>
          {debts.length > 0 ? (
            debts.map((debt, index) => (
              <div key={index} className="debt-item">
                <div className="debt-header">
                  <strong>{debt.type}</strong> - {formatCurrency(debt.amount)}
                </div>
                <div className="debt-details">
                  <p>
                    <strong>Payment Schedule:</strong> {debt.paymentSchedule}
                  </p>
                  <p>
                    <strong>Payment Amount:</strong> {debt.paymentAmount ? formatCurrency(debt.paymentAmount) : 'N/A'}
                  </p>
                  <p>
                    <strong>Remaining Due Dates:</strong>
                  </p>
                  {debt.dueDates && debt.dueDates.length > 0 ? (
                    <ul className="due-dates-list">
                      {debt.dueDates.map((dueDate, i) => (
                          <li key={i} style={{ textDecoration: dueDate.isPaid ? 'line-through' : 'none' }}>
                              {new Date(dueDate.date).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                              })}
                              <input
                                  type="checkbox"
                                  checked={dueDate.isPaid}
                                  onChange={() => handleTogglePaid(debt._id, i)}
                              />
                              <label>{dueDate.isPaid ? 'Paid' : 'Unpaid'}</label>
                          </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No due dates available.</p>
                  )}
                </div>
                <div className="debt-actions">
                  <button className="edit-button" onClick={() => handleEditItem(index, true)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteItem(index, true)}>Delete</button>

                </div>
              </div>
            ))
          ) : (
            <p>No debts found.</p>
          )}

          <div className="add-debt">
            <button
              className="add-more-button"
              onClick={() => {
                setShowModal(true);
                setIsDebtModal(true);
              }}
            >
              Add More Debt
            </button>
          </div>

        </section>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              {isEditing
                ? isDebtModal
                  ? 'Edit Debt'
                  : 'Edit Account'
                : isDebtModal
                ? 'Add New Debt'
                : 'Add New Account'}
            </h2>
            <label>
              {isDebtModal ? 'Debt Type:' : 'Account Type:'}
              <input
                type="text"
                value={newItem.type}
                onChange={(e) =>
                  setNewItem({ ...newItem, type: e.target.value })
                }
                placeholder={isDebtModal ? 'e.g., Car Loan' : 'e.g., Checking'}
              />
            </label>
            {!isDebtModal && (
              <label>
                Last 4 Digits of Account Number:
                <input
                  type="text"
                  value={newItem.number}
                  onChange={(e) =>
                    setNewItem({ ...newItem, number: e.target.value })
                  }
                  placeholder="e.g., 1234"
                />
              </label>
            )}
            <label>
              Amount:
              <input
                type="number"
                value={newItem.amount}
                onChange={(e) =>
                  setNewItem({ ...newItem, amount: e.target.value })
                }
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
                    <option value="">Select Schedule</option>
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
            <div className="modal-buttons">
              <button onClick={handleAddOrEditItem}>
                {isEditing ? 'Save Changes' : 'Add'}
              </button>
              <button onClick={resetForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
 
export default Balances;