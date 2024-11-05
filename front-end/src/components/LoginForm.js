import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'


const apiUrl = process.env.REACT_APP_API_URL;

const LoginForm = () => {
  const [logIn, setLogIn] = React.useState(false)

  const [formData, setFormData] = React.useState({
      username: '',
      password: '',
  })

  const [error, setError] = React.useState(null)

  const handleChange = (e) => {
      const { name, value } = e.target
      setFormData((prevData) => ({
          ...prevData,
          [name]: value,
      }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post(`${apiUrl}/api/account/login`, formData);
        console.log(response.data.message)
    } catch (error) {
      if (error.response) {
          setError(error.response.data.message)
      } else {
          setError(`Network error: ${error.message}`)
      }
    }
  }

  if (logIn){
    return <Navigate to='/' /> 
  }

  return (
    <form className='m-5' onSubmit={handleSubmit}>
      <div className='grid'>
        <label htmlFor='username' className='text-base mb-2 font-medium'>Username</label>
        <input 
            name='username' 
            type='text' 
            onChange={handleChange}
            autoComplete='username'
            aria-hidden="true"
            required
            className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-gray-400 text-base' />
      </div>
      <div className='grid'>
        <label htmlFor='password' className='text-base mb-2 font-medium'>Password</label>
        <input 
            name='password' 
            type='password' 
            onChange={handleChange}
            autoComplete='current-password'
            required
            className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-gray-400 text-base' />
        </div>

      <div className='grid gap-2'>
        <button 
            type='submit'
            className='bg-gray-900 text-white py-2 px-2 rounded hover:bg-gray-500'
          >
            Sign in
        </button>
      </div>

      {error && <p className='text-red-500'>{error}</p>}
    </form>
    )
}

export default LoginForm;
