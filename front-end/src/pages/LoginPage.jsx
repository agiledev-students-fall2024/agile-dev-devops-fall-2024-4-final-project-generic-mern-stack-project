import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles.css'

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder: On submit, redirect to home
    navigate('/home');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" name="username" required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">I don't have an account</Link>
      <br />
      <Link to="/forgot-password">Forgot Password?</Link>
    </div>
  );
};

export default LoginPage;
