// src/pages/Home.js
import React, { useState } from 'react';
import TripTabs from '../components/trip/TripTabs';
import TripList from '../components/trip/TripList';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import './Home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('current');
  const { isLoggedIn } = useAuth(); // Access login state

  return (
    <div className="home">
      <div className="home__trips">
        <div className="home__trips-header">
          <h2 className="home__trips-title">My Trips</h2>
          <div className="home__trips-actions">
            {isLoggedIn ? ( // Conditional rendering based on login state
              <>
                <a href="/join-trip">Join Trip</a>
                <span className="home__trips-actions__separator">|</span>
                <a href="/create-trip">Create Trip</a>
              </>
            ) : (
              <span>Please log in to manage your trips.</span> // Message for non-logged-in users
            )}
          </div>
        </div>
        <TripTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <TripList activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Home;
