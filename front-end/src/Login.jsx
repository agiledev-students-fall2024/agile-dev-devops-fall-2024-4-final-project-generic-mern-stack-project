// src/Login.js
import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
        </form>
        {/* Link to the signup page */}
        <p className="mt-4">Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;

