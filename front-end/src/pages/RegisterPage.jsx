import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles.css'

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Placeholder: On submit, redirect to home
    navigate('/home');
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
      <Link to="/login">I have an account already</Link>
    </div>
  );
};

export default RegisterPage;
