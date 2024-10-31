import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LocationCard.css';

const LocationCard = ({ location, tripStatus }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (tripStatus === 'completed') {
      navigate(`/past-trip/${location.id}`); 
    } else {
      navigate(`/activities/${location.id}`); 
    }
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
