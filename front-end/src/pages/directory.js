import React from 'react';
import Button from '../components/button';

function Directory() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to the Home Page</h1>
      <p className="text-lg text-gray-600 mt-4">This is a Tailwind CSS styled page.</p>
      <Button text="Click Me" />
    </div>
  );
}

export default Directory;

