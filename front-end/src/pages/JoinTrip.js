import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './JoinTrip.css';
import axios from 'axios';

const JoinTrip = () => {
  const navigate = useNavigate();
  const [tripId, setTripId] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    setTripId(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' }); 

    try {
      // will replace 'user_123' with the actual logged-in user's ID in a real application
      const response = await axios.post(`/trips/${tripId}/join`, { userId: 'user_123' });

      if (response.status === 200) {
        setFeedback({
          type: 'success',
          message: (
            <>
              Successfully joined the trip! <Link to={`/locations/${tripId}`}>View Trip</Link>
            </>
          ),
        });
      }
    } catch (error) {
      console.error('Error joining trip:', error);
      if (error.response && error.response.status === 404) {
        setFeedback({ type: 'error', message: 'Trip not found. Please check the Trip ID and try again.' });
      } else if (error.response && error.response.status === 400) {
        setFeedback({ type: 'error', message: 'You are already a participant in this trip.' });
      } else {
        setFeedback({ type: 'error', message: 'An error occurred. Please try again later.' });
      }
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
      {feedback.message && (
        <p className={`join-trip-${feedback.type === 'success' ? 'success' : 'error'}`}>
          {feedback.message}
        </p>
      )}
    </div>
  );
};

export default JoinTrip;
