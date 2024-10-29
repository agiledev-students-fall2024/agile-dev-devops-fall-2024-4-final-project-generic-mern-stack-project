// src/Signup.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // Here you can add your registration logic (e.g., API call)
    // After successful signup, navigate to the Map page
    navigate('/map');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <button type="submit" className="bg-emerald-800 text-white px-4 py-2 rounded-md">Sign Up</button>
        </form>
        <p className="mt-4">Already have an account? <Link to="/login" className="text-emerald-800">Log in</Link></p>
      </div>
    </div>
  );
};

export default Signup;
