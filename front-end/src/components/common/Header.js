// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../profile/ProfileDropdown';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import './Header.css';

const Header = () => {
  const { isLoggedIn, username } = useAuth(); // Access isLoggedIn and username from context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    console.log('User signed out');
  };

  // Display name when username is not provided
  const displayName = username || "J Doe"; // Default name

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" className="header__logo-link">TripTease</Link>
      </div>

      <div className="header__right">
        {isLoggedIn ? (
          <div
            className="header__profile-wrapper"
            onClick={toggleDropdown}
          >
            <div className="header__profile">
              <span className="header__profile-menu-icon">☰</span>
              <span className="header__profile-icon">{displayName}</span> {/* Display username here */}
            </div>
            {isDropdownOpen && <ProfileDropdown onSignOut={handleSignOut} />}
          </div>
        ) : (
          <div className="header__auth">
            <Link to="/login" className="header__auth-link">Login</Link>
            <Link to="/signup" className="header__auth-button">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
