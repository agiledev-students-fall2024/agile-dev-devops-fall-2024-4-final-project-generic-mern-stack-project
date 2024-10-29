import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-2xl font-bold">Logo</div>
        <div className="space-x-4">
          <button className="p-2">Menu</button>
        </div>
      </nav>

      {/* Logo Section */}
      <section className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-4">Logo</h1>
        <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded-md">
          Join the Community
          </Link>
      </section>

      {/* Feature Sections */}
      <section className="w-full px-4 py-8 space-y-8">
        {/* Feature 1 */}
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="w-1/2 bg-gray-200 p-8">
            <h2 className="text-xl font-bold">Feature 1</h2>
          </div>
          <div className="w-1/2 p-8">
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="w-1/2 bg-gray-200 p-8">
            <h2 className="text-xl font-bold">Feature 2</h2>
          </div>
          <div className="w-1/2 p-8">
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="w-1/2 bg-gray-200 p-8">
            <h2 className="text-xl font-bold">Feature 3</h2>
          </div>
          <div className="w-1/2 p-8">
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

