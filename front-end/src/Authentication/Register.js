import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const nav = useNavigate()

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!username || !password || !firstName || !lastName) {
            alert("Please fill out all required fields.")
            return
        }
        if (username.length < 8 || password.length < 8) {
            alert("Please make sure your username and password are at least 8 characters long.")
            return
        }
        else {
            const send = {
                username,
                password,
                first_name: firstName,
                last_name: lastName
            }
    
            const new_user = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(send)
              }
            const response = await fetch('http://localhost:4000/register', new_user)
            const responseParsed = await response.json()
            if (responseParsed.message) {
                alert(responseParsed.message)
                return
            }
            else {
                localStorage.setItem("session_user", JSON.stringify(responseParsed))
                nav('/Homepage')
            }
        }
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
    }

    return (
        <div className="register-container">
            <h1>Register</h1>
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
                    <input type="text" value={firstName} onChange={handleFirstName} placeholder={"Input Password Here"}/>
                </div>
                <div>
                    <h3>Last Name</h3>
                    <input type="text" value={lastName} onChange={handleLastName} placeholder={"Input Password Here"}/>
                </div>
                    <button onClick={handleSubmit} className="register-btn">Submit</button>
            
        </div>
    )
}

export default Login;