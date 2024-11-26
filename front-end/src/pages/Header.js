import React, { useState, useEffect } from 'react';
import '../assets/styles/App.css';
import logo from '../assets/images/dreamer-1.png';
import { Link } from 'react-router-dom';
import Button from '../components/button';

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    // Check if 'isLoggedIn' flag is in localStorage
    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Remove login flag
    setIsLoggedIn(false); // Update login status
    window.location.href = '/'; // Redirect to home after logout
  };

  return (
    <div>
      <header className="App-header">
        <Link to="/"> 
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <div className="controls-container"> 
          {isLoggedIn ? (
            <Button type="button" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button type="button" onClick={() => window.location.href='/login'}>Login</Button>
              <Button type="button" onClick={() => window.location.href='/register'}>Register</Button>
            </>
          )}

          <div className="dropdown">
            <button className="hamburger-menu" onClick={toggleDropdown}>
              &#9776; {/* Hamburger Icon */}
            </button>
          </div>

          {/* Conditionally render the dropdown menu based on state */}
          {isOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/">Home</Link></li>
              {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
              {!isLoggedIn && <li><Link to="/register">Register</Link></li>}
              <li><Link to="/about">About</Link></li>
              <li><Link to="/modify-pins">Modify Pins</Link></li>
              {isLoggedIn && <li><Link to="/user-settings">User Settings</Link></li>}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
