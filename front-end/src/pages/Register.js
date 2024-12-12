import React, { useState } from 'react';
import '../assets/styles/register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://64.225.57.7:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful!');
        console.log('Registration successful:', data);
        window.location.href = '/login';
      } else if (data.errors) {
        const fieldErrors = {};
        data.errors.forEach((err) => {
          fieldErrors[err.param] = err.msg; // Map field to error message
        });
        setErrors(fieldErrors); // Set specific errors
      } else {
        setMessage(`Registration failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors({ ...errors, username: '' }); // Clear username error
            }}
            placeholder="Enter your username"
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: '' }); // Clear email error
            }}
            placeholder="Enter your email"
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: '' }); // Clear password error
            }}
            placeholder="Enter your password"
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors({ ...errors, confirmPassword: '' }); // Clear confirm password error
            }}
            placeholder="Confirm your password"
            required
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Register;
