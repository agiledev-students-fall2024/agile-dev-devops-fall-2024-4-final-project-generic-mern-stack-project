import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const nav = useNavigate()

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleRegister = () => {
        nav('/Register');
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const send = {
            username,
            password
        }
        const user = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(send)
          }
        const response = await fetch('http://localhost:4000/login', user)
        const responseParsed = await response.json()
        if (responseParsed.error) {
            alert(responseParsed.error)
            return
        }
        else {
            window.localStorage.setItem("session_user", JSON.stringify(responseParsed))
            nav('/Homepage')
        }
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