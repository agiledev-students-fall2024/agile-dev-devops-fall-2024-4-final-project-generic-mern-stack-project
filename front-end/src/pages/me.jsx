// src/pages/me.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './me.css';

const Me = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://my.api.mockaroo.com/tracker.json?key=a3c50f90');
        setUser(response.data[0]); // Assuming the response is an array with user objects
      } catch (error) {
        setError('Unable to load user data');
        console.error("Error fetching user data from Mockaroo:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChangePassword = () => {
    setMessage("Sorry, can't do that. There's no backend yet.");
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="me-container">
      <h2>My Account</h2>
      <img
        className="profile-pic"
        src={`https://picsum.photos/seed/${user.username}/100`}
        alt="Profile"
      />
      <p><strong>First Name:</strong> {user.first_name}</p>
      <p><strong>Last Name:</strong> {user.last_name}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Password:</strong> ***</p>

      {/* Password Change Section */}
      <div className="password-change-section">
        <input
          type="password"
          className="password-input"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          className="change-password-btn"
          onClick={handleChangePassword}
        >
          Change Password
        </button>
        {message && <p className="info-message">{message}</p>}
      </div>
    </div>
  );
};

export default Me;
