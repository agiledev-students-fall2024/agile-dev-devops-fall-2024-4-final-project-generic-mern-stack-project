import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const nav = useNavigate()
    const submitButton = useRef({
        username: "",
        password: ""
    })

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleRegister = () => {
        nav('/Register');
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        submitButton.current.username = username
        submitButton.current.password = password
        //send to backend and get a response with user
        //make alert if user is not found
        //window.localStorage.setItem("session_id", JSON.stringify(user))
        nav('/Homepage')
    }

    return (
        <div className='login-container'>
            <h1>Login</h1>
                <div>
                    <h3>Username</h3>
                    <input type="text" value={username} onChange={handleUsername} placeholder={"Input Username Here"}/>
                </div>
                <div>
                    <h3>Password</h3>
                    <input type="password" value={password} onChange={handlePassword} placeholder={"Input Password Here"}/>
                </div>
                <div className="button-container">
                    <button onClick={handleSubmit} className="login-btn">Login</button>
                    <button onClick={handleRegister} className="register-btn">Register</button>
                </div>
        </div>
    )
}

export default Login;