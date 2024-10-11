import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Placeholder: After password reset, redirect to login
    navigate('/login');
  };

  return (
    <div>
      <h1>Forgot Password Page</h1>
      <form onSubmit={handlePasswordReset}>
        <label>
          Enter your email to reset password:
          <input type="email" name="email" required />
        </label>
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
