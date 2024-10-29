// src/pages/loginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginPage.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle login validation
  const handleLogin = () => {
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    // Hardcoded username and password for demo purposes
    if (username === 'username' && password === 'password') {
      onLogin();
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogin}>Login</button>

      {/* Registration link */}
      <div className="register-container">
        <Link to="/register" className="register-link">
          Not registered? Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
