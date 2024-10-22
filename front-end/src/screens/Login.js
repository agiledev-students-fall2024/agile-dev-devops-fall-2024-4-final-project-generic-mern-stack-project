import '../styles/main.css'
import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div>
      <header>
        <div></div>
        <Link to='/register'>Register</Link>
      </header>

      <Container>
        <h1>LOG IN</h1>
        <LoginForm />
      </Container>
    </div>
  )
}

export default Login
