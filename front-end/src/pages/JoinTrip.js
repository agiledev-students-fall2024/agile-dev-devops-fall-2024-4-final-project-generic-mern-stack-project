import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JoinTrip.css';
import axios from 'axios';

const JoinTrip = () => {
  const navigate = useNavigate();
  const [tripId, setTripId] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setTripId(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://mock-api-misty-fog-1131.fly.dev/api/trips/${tripId}`);
      if (response.status === 200) {
        navigate(`/locations/${tripId}`);
      } else {
        setError('Trip not found. Please check the Trip ID and try again.');
      }
    } catch (error) {
      console.error('Error joining trip:', error);
      setError('Trip not found. Please check the Trip ID and try again.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="join-trip-page">
      <h2>Join a Trip</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Trip ID:
          <input
            type="text"
            name="tripId"
            value={tripId}
            onChange={handleInputChange}
            placeholder="Enter Trip ID"
            required
          />
        </label>
        <button type="submit">Join Trip</button>
        <button type="button" onClick={handleCancel} className="cancel-button">
          Cancel
        </button>
      </form>
      {error && <p className="join-trip-error">{error}</p>}
    </div>
  );
};

export default JoinTrip;
