import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import './SignUpPage.css';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // State for email
  const [name, setName] = useState(''); // State for full name
  const navigate = useNavigate();
  const { login, setUsername: setAuthUsername } = useAuth(); // Get login function and setUsername from context

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email); // Log email
    console.log('Full Name:', name); // Log full name
    setAuthUsername(username); // Set username in context
    login(); // Call login on successful signup
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="signup-page">
      <h2>Welcome To TripTease!<br /> Start by Signing Up.</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <br />
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
        <br />
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
        <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
