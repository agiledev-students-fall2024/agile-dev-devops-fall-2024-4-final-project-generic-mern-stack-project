import React from 'react';
import './TripMembersList.css';

const TripMembersList = ({ participants }) => {
  return (
    <div className="trip-members-list">
      <h2>Trip Members</h2>
      <ul>
        {participants.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </div>
  );
};

export default TripMembersList;
