import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinCreateMeetingPage = () => {
  const navigate = useNavigate();
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [meetingId, setMeetingId] = useState('');

  const handleLogout = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleCreateMeeting = async () => {
    try {
        const response = await fetch('http://localhost:8080/meeting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        navigate(`/meetings/${data.id}`);
    } catch (error) {
        console.error('Error creating meeting:', error);
    }
};

const handleJoinMeeting = async (e) => {
  e.preventDefault();
  if (meetingId.trim()) {
      try {
          const response = await fetch(`http://localhost:8080/meeting/${meetingId}`);
          if (response.ok) {
              navigate(`/meetings/${meetingId}`);
          } else {
              // Handle meeting not found
              alert('Meeting not found');
          }
      } catch (error) {
          console.error('Error joining meeting:', error);
      }
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm py-6">
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
          <div className="flex justify-between items-center">
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900">Meeting Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="ml-8 px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg 
                       hover:bg-gray-200 transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <ActionButton
            text="New meeting"
            color="bg-orange-500"
            onClick={handleCreateMeeting}
          />
          <ActionButton
            text="Join"
            color="bg-blue-500"
            onClick={() => setShowJoinForm(true)}
          />
        </div>
        {showJoinForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h2 className="text-xl font-bold mb-4">Join Meeting</h2>
              <form onSubmit={handleJoinMeeting}>
                <div className="mb-4">
                  <label htmlFor="meetingId" className="block text-sm font-medium text-gray-700 mb-1">
                    Meeting ID
                  </label>
                  <input
                    type="text"
                    id="meetingId"
                    value={meetingId}
                    onChange={(e) => setMeetingId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter meeting ID"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowJoinForm(false);
                      setMeetingId('');
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const ActionButton = ({ text, color, onClick }) => (
  <button
    onClick={onClick}
    className={`${color} text-white p-6 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity`}
  >
    <span className="text-lg font-medium">{text}</span>
  </button>
);

export default JoinCreateMeetingPage;