import React from 'react';
import './LocationCard.css';
import { useNavigate } from 'react-router-dom';

const LocationCard = ({ location }) => {
  const navigate = useNavigate(); //need to initialize this, not sure exactly why

  const handleCardClick = () => {
    //navigate('/a'); //this is just a placeholder before we build the backend
    navigate(`/activities/${location.id}`); //now it's dynamically routing, this is good
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