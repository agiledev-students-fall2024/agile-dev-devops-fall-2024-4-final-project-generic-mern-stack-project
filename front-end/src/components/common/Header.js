import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../profile/ProfileDropdown';
import './Header.css';

const Header = ({ user, isLoggedIn }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleSignOut = () => {
    console.log('User signed out');
    // We will add actual sign-out logic here
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" className="header__logo-link">TripTease</Link>
      </div>

      <div className="header__right">
        {isLoggedIn ? (
          <div
            className="header__profile"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="header__profile-icon">🧑</span>
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
