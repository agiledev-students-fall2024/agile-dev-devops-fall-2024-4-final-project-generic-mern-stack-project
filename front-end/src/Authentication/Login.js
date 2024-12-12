import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const nav = useNavigate()

    useEffect(() => {
        window.localStorage.setItem("session_user", JSON.stringify({}))
        window.localStorage.setItem("token", "")
    }, []);

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
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`, user)
        const token = response.headers.get('Authorization')
        const responseParsed = await response.json()
        if (responseParsed.error) {
            alert(responseParsed.error)
            return
        }
        else {
            window.localStorage.setItem("session_user", JSON.stringify(responseParsed))
            window.localStorage.setItem("token", token)
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