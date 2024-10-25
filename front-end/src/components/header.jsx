import React, { useState } from 'react';
import './header.css';

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [currentMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));  // Dynamically get current month
  const [currentBudget, setCurrentBudget] = useState('Personal Budget');

  const budgetOptions = [
    'Personal Budget',
    'Create New Budget'
  ];

  // implement later for changing budget
  const handleBudgetChange = (option) => {
    if (option === 'Create New Budget') {
      console.log("Redirect to new budget creation page");
    } else {
      setCurrentBudget(option);
    }
    setDropdownVisible(false);
  };

  return (
    <div className="header-container">
      <div className="header-title" onClick={() => setDropdownVisible(!dropdownVisible)}>
        <h1 className="header-month">{currentMonth}</h1>
        <p className="header-budget">{currentBudget}</p>
      </div>
      
      {dropdownVisible && (
        <ul className="dropdown-menu">
          {budgetOptions.map((option, index) => (
            <li key={index} onClick={() => handleBudgetChange(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Header;
