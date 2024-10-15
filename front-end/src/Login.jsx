// App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [message, setMessage] = useState('');

  // Handle Email Submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate sending OTP
      await axios.post('/api/send-otp', { email });
      setShowOtpInput(true);
      setMessage('OTP has been sent to your email.');
    } catch (error) {
      setMessage('Error sending OTP.');
    }
  };

  // Handle OTP Verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate OTP validation
      await axios.post('/api/verify-otp', { email, otp });
      setMessage('Login successful!');
    } catch (error) {
      setMessage('Invalid OTP.');
    }
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h2>Login with OTP</h2>
      
      {!showOtpInput ? (
        <form onSubmit={handleEmailSubmit}>
          <div>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <div>
            <label>OTP: </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
