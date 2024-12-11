import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleRegister = () => {
        nav('/Register');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { username, password };

        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log('Token Received:', responseData.token); // Debugging log
                window.localStorage.setItem('auth_token', responseData.token); // Save token to localStorage
                console.log('Token in Local Storage:', localStorage.getItem('auth_token')); // Confirm storage
                nav('/Homepage'); // Redirect to the homepage
            } else {
                alert(responseData.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>Username</h3>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={handleUsername} 
                        placeholder="Input Username Here"
                    />
                </div>
                <div>
                    <h3>Password</h3>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={handlePassword} 
                        placeholder="Input Password Here"
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="login-btn">Login</button>
                    <button type="button" onClick={handleRegister} className="register-btn">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
