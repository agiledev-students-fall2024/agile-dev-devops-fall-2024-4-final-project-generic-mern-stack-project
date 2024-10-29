import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import './sideNavBar.css';

function SideNavBar({ isLoggedIn, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isLoggedIn) return null;

  return (
    <div>
      <div style={{ position: 'absolute', top: 10, left: 10 }}>
        <FiMenu size={30} onClick={toggleMenu} style={{ cursor: 'pointer', color: 'black' }} />
      </div>

      {isMenuOpen && <div className="side-nav-overlay" onClick={toggleMenu}></div>}

      <div className={`side-nav ${isMenuOpen ? 'open' : ''}`}>
        <nav>
          <Link to="/me" onClick={toggleMenu}>My Account</Link>
          <Link to="/recurringPayments" onClick={(toggleMenu)}>Recurring Payments</Link>
          <button onClick={() => { toggleMenu(); handleLogout(); }}>Logout</button>
        </nav>
      </div>
    </div>
  );
}

export default SideNavBar;
