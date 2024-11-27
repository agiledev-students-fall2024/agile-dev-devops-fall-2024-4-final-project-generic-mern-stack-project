import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogInForm from '../components/forms/LogInForm';
import './LogIn.css';

const LogIn = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (credentials) => {
    console.log('Logging in with credentials:', credentials);
    // here is where u connect the log in to the backend
    navigate('/'); // this just routes you back to the home page
  };

  return (
    <div className="login-page">
      <LogInForm onSubmit={handleFormSubmit} />
      <button className="signup-redirect-button" onClick={() => navigate('/sign-up')}>
        Create an account? Sign Up
      </button>
    </div>
  );
};

export default LogIn;
