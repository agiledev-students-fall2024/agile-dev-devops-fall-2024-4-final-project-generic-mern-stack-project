// src/components/profile/ProfileDropdown.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileDropdown.css';

const ProfileDropdown = ({ onSignOut, isLoggedIn }) => {
  return (
    <div className="profile-dropdown">
      {isLoggedIn ? (
        <>
          <Link to="/profile" className="profile-dropdown-item">
            <span className="profile-dropdown-item-icon">🧑</span>
            Profile
          </Link>
          <button className="profile-dropdown-item" onClick={onSignOut}>
            <span className="profile-dropdown-item-icon">🚪</span>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="profile-dropdown-item">
            <span className="profile-dropdown-item-icon">🔑</span>
            Login
          </Link>
          <Link to="/signup" className="profile-dropdown-item">
            <span className="profile-dropdown-item-icon">📝</span>
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
