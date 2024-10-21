import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileDropdown.css';

const ProfileDropdown = ({ onSignOut }) => {
  return (
    <div className="profile-dropdown">
      <Link to="/profile" className="profile-dropdown-item">
        <span className="profile-dropdown-item-icon">🧑</span>
        Profile
      </Link>
      <button className="profile-dropdown-item" onClick={onSignOut}>
        <span className="profile-dropdown-item-icon">🚪</span>
        Sign Out
      </button>
    </div>
  );
};

export default ProfileDropdown;
