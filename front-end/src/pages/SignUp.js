import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/forms/SignUpForm';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null); // state for handling errors

  const handleFormSubmit = (userData) => {
    console.log('Signing up with data:', userData);
    
    // Simulate success or failure of sign-up logic here
    const success = true; // Simulate success for now

    if (success) {
      navigate('/'); // Redirect to Home page on successful signup
    } else {
      setError('There was an issue creating your account. Please try again.'); // Simulated error message
    }
  };

  return (
    <div className="signup-page">
      <SignUpForm onSubmit={handleFormSubmit} />
      {error && <div className="error-message">{error}</div>} {/* Show error message */}
      <button className="login-redirect-button" onClick={() => navigate('/log-in')}>
        Already have an account? Log In
      </button>
    </div>
  );
};

export default SignUp;
