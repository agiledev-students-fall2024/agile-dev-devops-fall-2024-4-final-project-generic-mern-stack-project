import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { FaAngleDoubleRight } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: 'unique_username',
    routes: [],
  });
  const API_KEY = process.env.REACT_APP_MOCKAROO_API_KEY;
  const ROUTES_URL = `https://my.api.mockaroo.com/Saved_Routes.JSON?key=${API_KEY}`;
  // const ROUTES_URL = './Routes.json'

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const { data } = await axios.get(ROUTES_URL);
        setUserInfo(prevInfo => ({ ...prevInfo, routes: data }));
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };
    fetchRoutes();
  }, []);

  return (
    <div className='min-h-screen bg-white'>
      <div className='px-4 pt-16'>
        <div className='mb-8 flex items-start space-x-4'>
          <div className='flex h-24 w-24 items-center justify-center rounded-lg bg-gray-100'>
            <User size={32} className='text-gray-400' />
          </div>
          <div className='flex-1'>
            <h2 className='text-lg font-medium'>{userInfo.username}</h2>
            <button
              onClick={() => navigate('/edit-profile')}
              className='mt-2 rounded-lg bg-emerald-800 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600'
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-lg font-medium'>Saved Routes</h3>
          <div
            className='flex cursor-pointer items-center'
            onClick={() => navigate('/saved-routes')}
          >
            <span className='mr-1 text-gray-600'>more</span>
            <FaAngleDoubleRight className='text-emerald-800' />
          </div>
        </div>

        <div className='mb-8 space-y-3'>
          {userInfo.routes.map((route, index) => (
            <div
              key={index}
              className='cursor-pointer rounded-lg bg-gray-50 p-4 text-left text-gray-700 transition-colors hover:bg-gray-100'
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
