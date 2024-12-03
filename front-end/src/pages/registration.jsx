// src/pages/registration.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './registration.css';

const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    setError(''); // Clear previous errors

    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      await axios.post('/api/signup', { username, email, password });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 2000); // Delay for user feedback
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      {/* Error message displayed after attempting registration */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Back to Login link */}
      <div className="login-link-container">
        <Link to="/login" className="login-link">
          Already have an account? Go back to login
        </Link>
      </div>
    </div>
  );
};

export default Registration;
