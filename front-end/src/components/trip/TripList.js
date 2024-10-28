import React from 'react';
import TripCard from './TripCard';
import './TripList.css';

const TripList = ({ activeTab }) => {
  const trips = [
    { id: 1, title: 'Trip to Paris', status: activeTab === 'current' ? 'Upcoming' : 'Completed' },
    { id: 2, title: 'New York Adventure', status: activeTab === 'current' ? 'In Progress' : 'Completed' },
    { id: 3, title: 'Hiking in Colorado', status: activeTab === 'current' ? 'Upcoming' : 'Completed' },
  ];

  return (
    <div className="trip-list">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
