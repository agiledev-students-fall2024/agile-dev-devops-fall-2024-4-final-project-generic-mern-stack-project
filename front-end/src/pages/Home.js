import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import TripTabs from '../components/trip/TripTabs';
import TripList from '../components/trip/TripList';
import axios from 'axios';
import './Home.css';

const Home = ({ isLoggedIn }) => {
  const [activeTab, setActiveTab] = useState('current');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // we will assume the current user ID is hardcoded or fetched from a global state or context (like logged in)
        const userId = 'user_123'; // This will be Replaced with actual logic for fetching current user
        const response = await axios.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/log-in" replace />;
  }

  return (
    <div className="home">
      <div className="home__trips">
        <div className="home__trips-header">
          <h2 className="home__trips-title">My Trips</h2>
          <div className="home__trips-actions">
            <a href="/join-trip">Join Trip</a>
            <span className="home__trips-actions__separator">|</span>
            <a href="/create-trip">Create Trip</a>
          </div>
        </div>
        <TripTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {user && <TripList userId={user.id} activeTab={activeTab} />}
      </div>
    </div>
  );
};

export default Home;
