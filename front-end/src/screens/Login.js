import '../styles/main.css'
import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div>
      <header>
        <div></div>
        <Link to='/register'>Register</Link>
      </header>

      <div className='container'>
        <h1>LOG IN</h1>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
