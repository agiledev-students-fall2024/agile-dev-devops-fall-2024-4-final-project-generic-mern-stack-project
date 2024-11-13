import React, { useEffect, useState } from 'react';
import TripCard from './TripCard';
import './TripList.css';
import axios from 'axios';

const TripList = ({ userId, activeTab }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserTrips = async () => {
      try {
        const response = await axios.get(`/users/${userId}/trips`);
        const filteredTrips = response.data.filter(trip =>
          activeTab === 'current' ? trip.status !== 'completed' : trip.status === 'completed'
        );
        setTrips(filteredTrips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTrips();
  }, [userId, activeTab]);

  if (loading) return <p>Loading trips...</p>;

  return (
    <div className="trip-list">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
