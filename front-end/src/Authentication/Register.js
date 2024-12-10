import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const nav = useNavigate();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastName = (e) => {
        setLastName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password || !firstName || !lastName) {
            alert("Please fill out all required fields.");
            return;
        }
        if (username.length < 8 || password.length < 8) {
            alert("Please make sure your username and password are at least 8 characters long.");
            return;
        }

        const registrationData = {
            username,
            password,
            first_name: firstName,
            last_name: lastName,
        };

        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registrationData),
            });

            const responseData = await response.json();

            if (response.ok) {
                // Save the token to localStorage
                window.localStorage.setItem('auth_token', responseData.token);
                nav('/Homepage'); // Redirect to the homepage
            } else {
                alert(responseData.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
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
                <div>
                    <h3>First Name</h3>
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={handleFirstName} 
                        placeholder="Input First Name Here"
                    />
                </div>
                <div>
                    <h3>Last Name</h3>
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={handleLastName} 
                        placeholder="Input Last Name Here"
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="register-btn">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
