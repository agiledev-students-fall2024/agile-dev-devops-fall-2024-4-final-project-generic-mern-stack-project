import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const nav = useNavigate()

    const submitButton = useRef({
        username: "",
        password: "",
        name: ""
    })

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!username || !password || !firstName || !lastName) {
            alert("Please fill out all required fields.")
            return
        }
        if (username.length >= 8 || password.length >= 8) {
            alert("Please make sure your username and password are at least 8 characters long.")
            return
        }
        submitButton.current.username = username
        submitButton.current.password = password
        submitButton.current.name = firstName + " " + lastName
        //send to backend
        //send alert if credentials dont meet requirements or a matching user is found
        //window.localStorage.setItem("session_id", JSON.stringify(user))
        nav('/')
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
    }

    return (
        <div className="register-container">
            <h1>Login</h1>
                <div>
                    <h3>Username</h3>
                    <input type="text" value={username} onChange={handleUsername} placeholder={"Input Username Here"}/>
                </div>
                <div>
                    <h3>Password</h3>
                    <input type="password" value={password} onChange={handlePassword} placeholder={"Input Password Here"}/>
                </div>
                <div>
                    <h3>First Name</h3>
                    <input type="password" value={firstName} onChange={handleFirstName} placeholder={"Input Password Here"}/>
                </div>
                <div>
                    <h3>Last Name</h3>
                    <input type="password" value={lastName} onChange={handleLastName} placeholder={"Input Password Here"}/>
                </div>
                    <button onClick={handleSubmit} className="register-btn">Submit</button>
            
        </div>
    )
}

export default Login;