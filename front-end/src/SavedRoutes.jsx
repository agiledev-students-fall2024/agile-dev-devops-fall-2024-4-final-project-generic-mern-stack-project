import React from 'react';
import { useNavigate } from 'react-router-dom';

const SavedRoutes = () => {
  const navigate = useNavigate();
  const routes = [
    {
      id: 1,
      name: 'From Washington Park to Central Park',
      image: '/api/placeholder/400/200'
    },
    {
      id: 2,
      name: 'Prospect Park Ride',
      image: '/api/placeholder/400/200'
    },
    {
      id: 3,
      name: 'Commute to School',
      image: '/api/placeholder/400/200'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16 px-4">
        <h1 className="text-xl font-medium mb-6">Saved Routes</h1>
        
        <div className="space-y-4">
          {routes.map((route) => (
            <div 
              key={route.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/map')}
            >
              <div className="aspect-video bg-gray-100">
                <img 
                  src={route.image} 
                  alt={route.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-medium text-gray-800">
                  {route.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedRoutes;