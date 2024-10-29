import React from 'react';
import { NavLink } from 'react-router-dom';
import './bottomNav.css';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-item" activeClassName="active">
        <img src="./home.png" alt="Home" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/charts" className="nav-item" activeClassName="active">
        <img src="./charts.png" alt="Charts" />
        <span>Charts</span>
      </NavLink>
      <NavLink to="/balances" className="nav-item" activeClassName="active">
        <img src="./bank.png" alt="Balances" />
        <span>Balances</span>
      </NavLink>
      <NavLink to="/goal" className="nav-item" activeClassName="active">
        <img src="./goals.png" alt="Goals" />
        <span>Goals</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
