import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProfile } from './ProfileContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useProfile();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });
      const resp = await response.json();

      if (resp.token) {
        localStorage.setItem('token', resp.token);
        setUser({ email: email });
        navigate('/');
      } else {
        alert('Login failed');
        throw new Error("Login failed");
      }

    } catch (error) {
      console.error("Error during login:", error);
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-box">
      <h1 className="auth-title">EasyNote</h1>
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;