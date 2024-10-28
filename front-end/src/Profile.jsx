import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ChevronRight } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const userInfo = {
    username: 'unique_username',
    routes: [
      'From Washington Park to Central Park',
      'Prospect Park Ride',
      'Commute to School',
      'Ride to the Bakery',
      'NYC to Boston'
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16 px-4">
        {/* Profile Header Section */}
        <div className="flex items-start space-x-4 mb-8">
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
            <User size={32} className="text-gray-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium">{userInfo.username}</h2>
            <button 
              onClick={() => navigate('/edit-profile')}
              className="mt-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Saved Routes Section */}
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-medium">Saved Routes</h3>
          <button 
            onClick={() => navigate('/saved-routes')}
            className="text-sm text-blue-500 hover:text-blue-600 flex items-center"
          >
            View All
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>

        {/* Routes List */}
        <div className="space-y-3 mb-8">
          {userInfo.routes.map((route, index) => (
            <div 
              key={index}
              className="p-4 bg-gray-50 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => navigate('/map')} // Assuming clicking a route takes you to the map
            >
              {route}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;