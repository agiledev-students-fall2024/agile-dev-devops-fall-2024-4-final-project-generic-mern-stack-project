import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SavedRoutes = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);

  const API_KEY = process.env.REACT_APP_MOCKAROO_API_KEY;
  const BASE_URL = `https://my.api.mockaroo.com/Saved_Routes.JSON?key=${API_KEY}`;

  const fetchRoutes = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setRoutes(response.data);
      // axios
      // .get('/Routes.json')
      // .then(response => {
      //   setRoutes(response.data);
      // })
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <div className='min-h-screen bg-white'>
      <div className='px-4 pt-16'>
        <h1 className='mb-6 text-xl font-medium'>Saved Routes</h1>

        <div className='space-y-4'>
          {routes.map(({ id, name, start_location, end_location, date }) => (
            <div
              key={id}
              className='cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md'
              onClick={() => navigate('/map')}
            >
              <div className='p-4'>
                <h3 className='text-base font-medium text-gray-800'>{name}</h3>
                <p className='text-sm text-gray-600'>
                  Start Location: {start_location}
                </p>
                <p className='text-sm text-gray-600'>
                  End Location: {end_location}
                </p>
                <p className='text-sm text-gray-600'>Date: {date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedRoutes;
