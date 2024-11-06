import React, { useState } from 'react';
import '../assets/styles/login.css';

/**
 * A React component that represents the register page of the app.
 * This component includes input fields for username, email, password, confirm password, and a submit button.
 * @param {*} props Props passed down from the parent component
 * @returns A register form in JSX form.
 */
const Register = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();
    // Add registration logic
    console.log('Registering with:', username, email, password, confirmPassword);
  };

  return (
    <div className="login-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" className="login-btn">Register</button>
      </form>
    </div>
  );
};

// register component
export default Register;
