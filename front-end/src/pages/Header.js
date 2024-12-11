import React, { useState, useEffect } from 'react';
import '../assets/styles/App.css';
import logo from '../assets/images/dreamer-1.png';
import { Link } from 'react-router-dom';
import Button from '../components/button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token'); // Check if a token exists in localStorage
    setIsLoggedIn(!!token); // If token exists, user is logged in
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
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
          {/* Render Logout button if logged in, otherwise show Login/Register */}
          {isLoggedIn ? (
            <Button type="button" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button type="button" onClick={() => (window.location.href = '/login')}>
                Login
              </Button>
              <Button type="button" onClick={() => (window.location.href = '/register')}>
                Register
              </Button>
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
              {isLoggedIn && <li><Link to="/modify-pins">Modify Pins</Link></li>}
              {isLoggedIn && <li><Link to="/user-settings">User Settings</Link></li>}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
