import React from 'react';
import './LocationCard.css';

const LocationCard = ({ location }) => {
  const handleCardClick = () => {
    console.log(`Navigating to location: ${location.name}`); //this is just a placeholder for now
  };

  return (
    <div className="location-card" onClick={handleCardClick}>
      <div className="location-card__image-wrapper">
        <img
          src={`https://picsum.photos/400/300?random=${location.id}`}
          alt={location.name}
          className="location-card__image"
        />
      </div>
      <h3 className="location-card__name">{location.name}</h3>
    </div>
  );
};

export default LocationCard;
