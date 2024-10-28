/**
 * A React component that represents a single page of the app.
 * Use this file to create new pages as needed
 * Don't forget to add the new route to App.js
 */

import React, { useState } from 'react';
import '../assets/styles/App.css';
import logo from '../assets/images/dreamer-1.png';
import { Link } from 'react-router-dom';



const Header = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
    return (
      <div>
         <header className="App-header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="dropdown">
          <button className="hamburger-menu" onClick={toggleDropdown}>
            &#9776; {/* Hamburger Icon */}
          </button>

          {/* Conditionally render the dropdown menu based on state */}
          {isOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/user-settings">User Settings</Link></li>
            </ul>
          )}
        </div>
      </header>
      </div>
    )
  }

  export default Header