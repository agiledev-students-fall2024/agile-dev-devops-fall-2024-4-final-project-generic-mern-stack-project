import React from 'react';
import './GroupTripPictureCard.css';

const GroupTripPictureCard = ({ tripName, tripId }) => {
  const imageUrl = `https://picsum.photos/200/100?random`;

  return (
    <div className="group-trip-picture-card">
      <div className="trip-image-container">
        <img src={imageUrl} alt={`Group trip to ${tripName}`} />
      </div>
      <h1>{tripName}</h1>
    </div>
  );
};

export default GroupTripPictureCard;
