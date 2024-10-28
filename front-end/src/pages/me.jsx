// src/pages/me.jsx
import React, { useState, useEffect } from 'react';
import mockData from '../mockData';
import './me.css';

const MyAccount = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');

  useEffect(() => {
    if (mockData && mockData.length > 0) {
      const user = mockData[0];
      setUserInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: user.password,
      });
    } else {
      console.error("No user data available in mockData");
    }
  }, []);

  const handleChangePassword = () => {
    setPasswordChangeMessage("Sorry, can't do that. No backend logic right now.");
  };

  return (
    userInfo && (
      <div className="me-container">
        <h2>My Account</h2>
        <p><strong>First Name:</strong> {userInfo.firstName}</p>
        <p><strong>Last Name:</strong> {userInfo.lastName}</p>
        <p><strong>Username:</strong> {userInfo.username}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Password:</strong> {userInfo.password}</p>
        
        <div className="password-change-section">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="password-input"
          />
          <button onClick={handleChangePassword} className="change-password-btn">
            Change Password
          </button>
          {passwordChangeMessage && <p className="info-message">{passwordChangeMessage}</p>}
        </div>
      </div>
    )
  );
};

export default MyAccount;
