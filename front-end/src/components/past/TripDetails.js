import React from 'react';
import './TripDetails.css';

const TripDetails = ({ title, description }) => {
  return (
    <div className="trip-details">
      <h2 className="trip-details__title">{title}</h2>
      <p className="trip-details__description">{description}</p>
    </div>
  );
};

export default TripDetails;
