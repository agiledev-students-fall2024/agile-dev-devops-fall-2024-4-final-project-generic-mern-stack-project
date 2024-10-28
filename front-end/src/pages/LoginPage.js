// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in:', { email, password });
    login(); 
    navigate('/'); 
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
