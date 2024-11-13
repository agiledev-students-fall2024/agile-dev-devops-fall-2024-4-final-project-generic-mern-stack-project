import React from 'react';
import './TripOverview.css';

const TripOverview = () => {
  return (
    <div className="trip-overview">
      <h2>My Trips</h2>
      <div className="trip-overview__list">
        <div className="trip-card">Trip 1</div>
        <div className="trip-card">Trip 2</div>
        <div className="trip-card">Trip 3</div>
      </div>
    </div>
  );
};

export default TripOverview;
