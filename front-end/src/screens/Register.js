import React from 'react'
import '../styles/main.css'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <div>
      <header>
        <div></div>
        <Link to='/login'>Log In</Link>
      </header>

      <Container>
        <h1>REGISTER</h1>
        <RegisterForm />
      </Container>
    </div>
  )
}

export default Register
