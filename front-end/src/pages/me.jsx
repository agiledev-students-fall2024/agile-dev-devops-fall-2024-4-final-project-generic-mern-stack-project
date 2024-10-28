// src/pages/me.jsx
import React, { useState } from 'react';
import './me.css';

const Me = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',      // Placeholder name
    username: 'johndoe',   // Placeholder username
    email: 'johndoe@example.com', // Placeholder email
    password: '********',   // Masked placeholder password
  });

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = () => {
    if (!newPassword || !confirmNewPassword) {
      setError('Please fill out all password fields.');
      setSuccess('');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      setSuccess('');
      return;
    }

    // Mock password update
    setUserInfo({ ...userInfo, password: '********' });
    setSuccess('Password successfully changed!');
    setError('');
  };

  return (
    <div className="me-container">
      <h2>My Account</h2>
      <p><strong>Name:</strong> {userInfo.name}</p>
      <p><strong>Username:</strong> {userInfo.username}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>Password:</strong> {userInfo.password}</p>

      <h3>Change Password</h3>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <button onClick={handlePasswordChange}>Change Password</button>
    </div>
  );
};

export default Me;
