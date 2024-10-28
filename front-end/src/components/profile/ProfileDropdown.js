// src/components/profile/ProfileDropdown.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  const { isLoggedIn, logout } = useAuth(); // Access login state and logout function
  const navigate = useNavigate(); // Get the navigate function

  const handleSignOut = () => {
    logout(); // Call logout
    navigate('/'); // Navigate to Home after logout
  };

  return (
    <div className="profile-dropdown">
      {isLoggedIn ? (
        <>
          <Link to="/profile" className="profile-dropdown-item">
            <span className="profile-dropdown-item-icon">⭐️</span>
            Profile
          </Link>
          <button className="profile-dropdown-item" onClick={handleSignOut}>
            <span className="profile-dropdown-item-icon">🚪</span>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <div>
            <Link to="/login" className="profile-dropdown-item">
              <span className="profile-dropdown-item-icon">🔑</span>
              Login
            </Link>
          </div>
          <div>
            <Link to="/signup" className="profile-dropdown-item">
              <span className="profile-dropdown-item-icon">📝</span>
              Sign Up
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
