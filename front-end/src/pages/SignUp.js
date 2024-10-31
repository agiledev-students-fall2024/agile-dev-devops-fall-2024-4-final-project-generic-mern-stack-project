import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/forms/SignUpForm';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (userData) => {
    console.log('Signing up with data:', userData);
    // add the backend logic here
    navigate('/'); // just a redirect to home
  };

  return (
    <div className="signup-page">
      <SignUpForm onSubmit={handleFormSubmit} />
      <button className="login-redirect-button" onClick={() => navigate('/log-in')}>
        Already have an account? Log In
      </button>
    </div>
  );
};

export default SignUp;
