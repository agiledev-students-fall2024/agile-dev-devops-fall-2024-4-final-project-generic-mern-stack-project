import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDoubleLeft } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/map');
  };

  return (
    <div className="h-94 flex items-center justify-center relative">
      <div className="absolute top-4 left-4 cursor-pointer" onClick={() => navigate('/')}>
        <FaAngleDoubleLeft className="text-2xl text-emerald-800" />
      </div>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <button type="submit" className="bg-emerald-800 text-white px-4 py-2 rounded-md">Login</button>
        </form>
        <p className="mt-4">Don't have an account? <Link to="/signup" className="text-emerald-800">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
