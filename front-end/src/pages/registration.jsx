// src/pages/registration.jsx
import React, { useState } from 'react';
import './registration.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
      return;
    }

    setSuccess('Registration successful!');
    setError('');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Registration;
