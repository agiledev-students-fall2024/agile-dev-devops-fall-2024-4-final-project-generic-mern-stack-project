import React, { useState } from 'react';
import TripTabs from '../components/trip/TripTabs';
import TripList from '../components/trip/TripList';
import './Home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('current');

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
        <TripList activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Home;
