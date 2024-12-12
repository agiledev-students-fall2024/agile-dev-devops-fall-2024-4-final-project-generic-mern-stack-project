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
 
  const calculatePayment = (debtAmount, dueDate, frequency) => {
    const today = new Date(); // Get today's date
    const due = new Date(dueDate); // Parse due date
 
    if (due < today) {
      throw new Error('Due date must be in the future.');
    }
 
    // Calculate the total time (in milliseconds) and convert to intervals
    const totalTime = due - today; // Total time in milliseconds
 
    let intervals;
    switch (frequency.toLowerCase()) {
      case 'monthly':
        intervals = Math.ceil(totalTime / (1000 * 60 * 60 * 24 * 30.44)); // Approx. 30.44 days in a month
        break;
      case 'annually':
        intervals = Math.ceil(totalTime / (1000 * 60 * 60 * 24 * 365.25)); // Leap year consideration
        break;
      case 'bi-weekly':
        intervals = Math.ceil(totalTime / (1000 * 60 * 60 * 24 * 14)); // 14 days
        break;
      default:
        throw new Error(
          "Invalid frequency. Use 'monthly', 'annually', or 'bi-weekly'."
        );
    }
 
    if (intervals <= 0) {
      throw new Error(
        'Interval calculation error. Ensure due date is in the future.'
      );
    }
 
    // Calculate and return the payment amount per interval
    return parseFloat((debtAmount / intervals).toFixed(2));
  };
 
  const handleAddOrEditItem = () => {
    resetMessage();
    const token = localStorage.getItem('token');
    const route = isDebtModal
      ? `${BASE_URL}/api/debts`
      : `${BASE_URL}/api/accounts`;
    const payload = { ...newItem, amount: Number(newItem.amount) };
 
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
 
      if (isEditing) {
        const id = isDebtModal
          ? debts[currentItemIndex]._id
          : accounts[currentItemIndex]._id;
        axios
          .put(`${route}/${id}`, payload, { headers })
          .then((response) => {
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
 
          .catch((err) => console.error('Error updating item:', err));
        console.log(debts);
      } else {
        axios
          .post(route, payload, { headers })
          .then((response) => {
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
 
  function formatDueDate(isoDate) {
    const date = new Date(isoDate); // Parse ISO date string
    const day = String(date.getDate()).padStart(2, '0'); // Get day (add leading zero)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-based index, so +1)
    const year = date.getFullYear(); // Get full year
    return `${day}/${month}/${year}`; // Format as dd/mm/yyyy
  }
 
  const getDueDates = (amount, dueDate, frequency, numberOfDates = 3) => {
    if (!amount || !dueDate || !frequency) return [];
    let nextDueDate = new Date(dueDate);
    const dueDates = [];
    const frequencyDays =
      {
        biweekly: 14,
        monthly: 30,
        annualy: 365,
      }[frequency.toLowerCase()] || 30;
 
    for (let i = 0; i < numberOfDates; i++) {
      dueDates.push(new Date(nextDueDate));
      nextDueDate.setDate(nextDueDate.getDate() + frequencyDays);
    }
 
    return dueDates;
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
                  $ {account.amount.toLocaleString()}
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
        <section className="paid-debt-section">
          <h1>Fully Paid Debt Panel</h1>
          <p>View all debt you have fully paid below</p>
          {paidDebts.length > 0 ? (
            paidDebts.map((paidDebt, index) => (
              <div key={index} className="debt">
                <div className="debt-type">
                  {paidDebt.type} - ${paidDebt.amount.toLocaleString()}
                </div>
                <div className="debt-info">
                  Due Date: {formatDueDate(paidDebt.dueDate)} <br />
                  Payment Schedule: {paidDebt.paymentSchedule}
                  <br />
                </div>
              </div>
            ))
          ) : (
            <p>No debts found.</p>
          )}
        </section>
        <section className="debt-section">
          <h1>Debt Management</h1>
          <p>View and edit all debt you have to pay below</p>
          {debts.length > 0 ? (
            debts.map((debt, index) => {
              // Calculate upcoming due dates
              const dueDates = getDueDates(
                debt.amount,
                debt.dueDate,
                debt.paymentSchedule
              );
 
              return (
                <div key={index} className="debt">
                  <div className="debt-type">
                    {debt.type} - ${debt.amount.toLocaleString()}
                  </div>
                  <div className="debt-info">
                    Due Date: {formatDueDate(debt.dueDate)} <br />
                    Payment Schedule: {debt.paymentSchedule}
                    <br />
                    <strong>Coming Due Dates:</strong>
                    <ul>
                      {dueDates.map((date, i) => (
                        <li key={i}>{date.toDateString()}</li>
                      ))}
                    </ul>
                    <label className="debt-paid-label"></label>
                    <strong>Paid:</strong>
                    <input
                      type="checkbox"
                      className={`paid-checkbox ${
                        debt.ispaidIncurrentPeriod
                          ? 'greyed-out'
                          : 'highlighted'
                      }`}
                      checked={debt.ispaidIncurrentPeriod}
                      onChange={(e) => handleTogglePaid(e, index)}
                    />
                    {
                      <select
                        name="accountId"
                        value={debt.accountId}
                        onChange={(e) => handleAccountSelection(e, index)}
                      >
                        <option value="">Select Account</option>
                        {accounts.map((account, accIndex) => (
                          <option key={account._id} value={account._id}>
                            {account.type} - XXXX{account.number}
                          </option>
                        ))}
                      </select>
                    }
                  </div>
                  <button
                    className="edit-button"
                    onClick={() => handleEditItem(index, true)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteItem(index, true)}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          ) : (
            <p>No debts found.</p>
          )}
          <button
            className="add-more-button"
            onClick={() => {
              setShowModal(true);
              setIsDebtModal(true);
            }}
          >
            Add More Debts
          </button>
          {message && <p className="info-message">{message}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                  Due Date:
                  <input
                    type="date"
                    value={newItem.dueDate.split('T')[0]}
                    onChange={(e) =>
                      setNewItem({ ...newItem, dueDate: e.target.value })
                    }
                  />
                </label>
                <label>
                  Payment Schedule:
                  <select
                    value={newItem.paymentSchedule}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        paymentSchedule: e.target.value,
                      })
                    }
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Annually">Annually</option>
                  </select>
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