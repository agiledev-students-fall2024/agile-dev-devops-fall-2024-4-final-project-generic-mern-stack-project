import React from 'react';

const LoginForm = () => {
  const [formData, setFormData] = React.useState({
      email: '',
      password: '',
  })

  const handleChange = (e) => {
      const { name, value } = e.target
      setFormData((prevData) => ({
          ...prevData,
          [name]: value,
      }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <form className='m-5' onSubmit={handleSubmit}>
      <div className='grid'>
        <label htmlFor='email' className='text-base mb-2 font-medium'>Email</label>
        <input 
            name='email' 
            type='email' 
            onChange={handleChange}
            autoComplete='username'
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
    </form>
    )
}

export default LoginForm;
