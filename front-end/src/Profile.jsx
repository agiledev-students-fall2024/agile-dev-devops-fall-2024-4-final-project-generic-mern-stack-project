import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ChevronRight } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ username: 'unique_username', routes: [] });
  const API_KEY = process.env.REACT_APP_MOCKAROO_API_KEY;
  // const ROUTES_URL = `https://my.api.mockaroo.com/Saved_Routes.JSON?key=${API_KEY}`;
  const ROUTES_URL = './Routes.json'

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const { data } = await axios.get(ROUTES_URL);
        setUserInfo(prevInfo => ({ ...prevInfo, routes: data }));
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16 px-4">
        <div className="flex items-start space-x-4 mb-8">
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
            <User size={32} className="text-gray-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium">{userInfo.username}</h2>
            <button 
              onClick={() => navigate('/edit-profile')}
              className="mt-2 px-4 py-2 text-sm bg-emerald-800 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium">Saved Routes</h3>
        </div>

        <div className="space-y-3 mb-8">
          {userInfo.routes.map((route, index) => (
            <div 
              key={index}
              className="p-4 bg-gray-50 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => navigate('/map')} 
            >
              {route.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
