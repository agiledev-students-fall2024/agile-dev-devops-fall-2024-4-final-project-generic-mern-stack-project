import React from 'react'
import '../styles/main.css'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <div>
      <header>
        <div></div>
        <Link to='/login'>Log In</Link>
      </header>

      <div className='container'>
        <h1>REGISTER</h1>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register
