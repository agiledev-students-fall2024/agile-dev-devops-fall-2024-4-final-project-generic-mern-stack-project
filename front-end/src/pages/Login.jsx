import "../index.css";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {
  //     const checkSession = async () => {
  //         try {
  //             const currentPath = window.location.pathname;
  //             const response = await axios.get(`${process.env.REACT_APP_BACK_PORT}/api/check-session`, {
  //                 params: { path: currentPath }
  //             });

  //             if (response.data.redirect === '/home') {
  //                 navigate('/home');
  //             }
  //         } catch (err) {
  //             console.error(err);
  //         }
  //     };

  //     checkSession();
  // }, [navigate]);

  async function goToHome(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_PORT}/api/auth/login`,
        { username, password }
      );
      console.log(response.data.message);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data.message || "Login failed");
      console.error(err);
    }
  }

  return (
    <>
      <h1 className="title">Bite Buddy</h1>
      <div className="registerDiv">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={goToHome}>
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
            {" "}
            Enter Password:
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>

        <a className="alternative" href="/signup">
          Sign Up
        </a>
      </div>
    </>
  );
}
export default Login;
