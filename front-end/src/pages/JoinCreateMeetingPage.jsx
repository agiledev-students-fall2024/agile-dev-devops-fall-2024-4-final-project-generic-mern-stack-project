import React from 'react';
import { useNavigate } from 'react-router-dom';

const JoinCreateMeetingPage = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Meeting Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <ActionButton text="New meeting" color="bg-orange-500" />
          <ActionButton text="Join" color="bg-blue-500" />
          <ActionButton text="Schedule" color="bg-blue-500" />
          <ActionButton text="Share screen" color="bg-blue-500" />
        </div>
      </main>
    </div>
  );
};

const ActionButton = ({ text, color }) => (
  <button className={`${color} text-white p-4 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity`}>
    <span className="text-sm font-medium">{text}</span>
  </button>
);

export default JoinCreateMeetingPage;