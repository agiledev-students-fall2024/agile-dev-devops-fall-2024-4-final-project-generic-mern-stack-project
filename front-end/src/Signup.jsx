// src/Signup.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDoubleLeft } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = e => {
    e.preventDefault(); // Prevent the default form submission
    // Here you can add your registration logic (e.g., API call)
    // After successful signup, navigate to the Map page
    navigate('/map');
  };

  return (
    <div className='relative flex h-94 items-center justify-center'>
      <div
        className='absolute left-4 top-4 cursor-pointer'
        onClick={() => navigate('/')}
      >
        <FaAngleDoubleLeft className='text-2xl text-emerald-800' />
      </div>
      <div className='rounded bg-white p-6 shadow-md'>
        <h2 className='mb-4 text-2xl'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              className='mt-1 block w-full rounded-md border border-gray-300 p-2'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              className='mt-1 block w-full rounded-md border border-gray-300 p-2'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              className='mt-1 block w-full rounded-md border border-gray-300 p-2'
              required
            />
          </div>
          <button
            type='submit'
            className='rounded-md bg-emerald-800 px-4 py-2 text-white'
          >
            Sign Up
          </button>
        </form>
        <p className='mt-4'>
          Already have an account?{' '}
          <Link to='/login' className='text-emerald-800'>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
