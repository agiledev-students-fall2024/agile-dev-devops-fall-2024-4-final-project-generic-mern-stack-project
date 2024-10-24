import React from 'react';
import './GroupTripPictureCard.css';

const GroupTripPictureCard = ({ tripName, tripId }) => {
  const imageUrl = `https://picsum.photos/id/${tripId}/500/200`;

  return (
    <div className="group-trip-picture-card">
      <h2>{tripName}</h2>
      <div className="trip-image-container">
        <img src={imageUrl} alt={`Group trip to ${tripName}`} />
      </div>
    </div>
  );
};

export default GroupTripPictureCard;
