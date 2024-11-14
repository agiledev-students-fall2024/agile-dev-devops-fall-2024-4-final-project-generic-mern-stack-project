import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaMapMarkerAlt } from 'react-icons/fa';
import { API_URL } from './config/api';

// const API_URL = 'http://localhost:3001/api';

const SavedRoutes = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/routes`);
      if (!response.ok) {
        throw new Error('Failed to fetch routes');
      }
      const data = await response.json();
      // Sort routes by date, most recent first
      const sortedRoutes = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRoutes(sortedRoutes);
      setError(null);
    } catch (error) {
      console.error('Error fetching routes:', error);
      setError('Failed to load routes. Please try again later.');
    }
    setIsLoading(false);
  };

  const deleteRoute = async (routeId) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      try {
        const response = await fetch(`${API_URL}/routes/${routeId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete route');
        }

        setRoutes(routes.filter(route => route.id !== routeId));
      } catch (error) {
        console.error('Error deleting route:', error);
        setError('Failed to delete route. Please try again.');
      }
    }
  };

  const handleRouteClick = (route) => {
    localStorage.setItem('selectedRoute', JSON.stringify(route));
    navigate('/map');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800"></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='px-4 pt-16 max-w-4xl mx-auto'>
        <div className="flex justify-between items-center mb-6">
          <h1 className='text-xl font-medium'>Saved Routes</h1>
          <button 
            onClick={() => navigate('/map')}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
          >
            Create New Route
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className='space-y-4'>
          {routes.length > 0 ? (
            routes.map((route) => (
              <div
                key={route.id}
                className='relative overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md border border-emerald-100'
              >
                <div className='p-4'>
                  <div className="flex justify-between items-start">
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => handleRouteClick(route)}
                    >
                      <h3 className='text-base font-medium text-gray-800'>{route.name}</h3>
                      <div className="mt-2 space-y-1">
                        <p className='text-sm text-gray-600 flex items-center'>
                          <FaMapMarkerAlt className="text-emerald-600 mr-2" />
                          From: {route.start_location}
                        </p>
                        <p className='text-sm text-gray-600 flex items-center'>
                          <FaMapMarkerAlt className="text-emerald-800 mr-2" />
                          To: {route.end_location}
                        </p>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-4">
                        <span className="text-sm text-gray-500">
                          {formatDate(route.date)}
                        </span>
                        <span className="text-sm text-gray-500">
                          Distance: {(route.distance / 1000).toFixed(2)} km
                        </span>
                        <span className="text-sm text-gray-500">
                          Duration: {Math.round(route.duration / 60)} min
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteRoute(route.id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete route"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">No routes saved yet.</p>
              <button
                onClick={() => navigate('/map')}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
              >
                Create Your First Route
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedRoutes;