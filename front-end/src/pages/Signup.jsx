import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { useState, useEffect } from "react";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  async function goToSignUpProfile(e) {
    e.preventDefault();

    if (username.length < 8) {
      setError("Username must be at least 8 characters");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_PORT}/api/auth/signup`,
        { username, password, email }
      );
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Token saved:', token);
      console.log(response.data.message);
      navigate("/signup-profile");
    } catch (err) {
      const backendError = err.response?.data?.error || "Signup failed";
      setError(backendError);
      console.error("Signup Error:", backendError);
    }
  }

  return (
    <>
      <h1 className="title">Bite Buddy</h1>
      <div className="registerDiv">
        <h2>Sign Up Today!</h2>

        {error && <p className="error">{error}</p>}
        <form onSubmit={goToSignUpProfile}>
          <label>
            Enter Email:
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Enter Username:
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Enter Password:
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Sign Up!</button>
        </form>
        <a className="alternative" href="/login">
          Log in
        </a>
      </div>
    </>
  );
}

export default Signup;
