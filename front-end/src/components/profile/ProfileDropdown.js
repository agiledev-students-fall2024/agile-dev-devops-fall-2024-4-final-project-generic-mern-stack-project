// src/components/profile/ProfileDropdown.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  const { isLoggedIn, signOut } = useAuth(); // Access login state and sign out function

  return (
    <div className="profile-dropdown">
      {isLoggedIn ? (
        <>
          <Link to="/profile" className="profile-dropdown-item">
            <span className="profile-dropdown-item-icon">🧑</span>
            Profile
          </Link>
          <button className="profile-dropdown-item" onClick={signOut}>
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
