import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TripCard.css';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  //TODO: once location specific pages are done this logic will be moved to that card
  const handleCardClick = () => {
    if (trip.status === 'Completed') {
      navigate(`/past-trip/${trip.id}`);
    }
  };

  return (
    <div className="trip-card" onClick={handleCardClick}>
      <div className="trip-card__image-wrapper">
        <img
          src={`https://picsum.photos/400/300?random=${trip.id}`}
          alt={trip.title}
          className="trip-card__image"
        />
        <span className="trip-card__status">{trip.status}</span>
      </div>
      <h3 className="trip-card__title">{trip.title}</h3>
    </div>
  );
};

export default TripCard;
