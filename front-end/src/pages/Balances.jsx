import './Balances.css'
import { useState } from 'react'

const Balances = () => {
  // State for managing accounts
  const [accounts, setAccounts] = useState([])

  // State for managing debts
  const [debts, setDebts] = useState([])

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentItemIndex, setCurrentItemIndex] = useState(null)

  const [isDebtModal, setIsDebtModal] = useState(false)

  const [newItem, setNewItem] = useState({ type: '', amount: '', number: '', dueDate: '', paymentSchedule: '' }) // Temp account or debt info

  const handleAddOrEditItem = () => {
    if (isEditing) {
      if (isDebtModal) {
        const updatedDebts = [...debts]
        updatedDebts[currentItemIndex] = { ...newItem, amount: Number(newItem.amount) }
        setDebts(updatedDebts)
      } else {
        const updatedAccounts = [...accounts]
        updatedAccounts[currentItemIndex] = { ...newItem, amount: Number(newItem.amount) }
        setAccounts(updatedAccounts)
      }
    } else {
      if (isDebtModal) {
        setDebts([...debts, { ...newItem, amount: Number(newItem.amount) }])
      } else {
        setAccounts([...accounts, { ...newItem, amount: Number(newItem.amount) }])
      }
    }

    setNewItem({ type: '', amount: '', number: '', dueDate: '', paymentSchedule: '' })
    setShowModal(false)
    setIsEditing(false)
    setIsDebtModal(false)
  }

  const handleDeleteItem = (index, isDebt) => {
    if (isDebt) {
      const updatedDebts = debts.filter((_, i) => i !== index)
      setDebts(updatedDebts)
    } else {
      const updatedAccounts = accounts.filter((_, i) => i !== index)
      setAccounts(updatedAccounts)
    }
  }

  const handleEditItem = (index, isDebt) => {
    if (isDebt) {
      setNewItem(debts[index])
      setCurrentItemIndex(index)
      setIsDebtModal(true)
    } else {
      setNewItem(accounts[index])
      setCurrentItemIndex(index)
      setIsDebtModal(false)
    }
    setIsEditing(true)
    setShowModal(true)
  }

  // Function to handle the Plaid button click... doesn't work yet
  const handlePlaidButtonClick = () => {
    alert("This button doesn't work yet!")
  }

  return (
    <main className="Home">
      {/* Flexbox container for Accounts and Debt sections */}
      <div className="container">
        {/* Accounts Section */}
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
            {/* New Link Account with Plaid Button */}
            <button className="plaid-button" onClick={handlePlaidButtonClick}>
              Link Account with Plaid
            </button>
          </div>
        </section>

        {/* Debt Management Section */}
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

      {/* Modal for Adding/Editing Accounts or Debts */}
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
                Account Number:
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
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Balances