import React from 'react';
import './TripMembersList.css';

const TripMembersList = ({ participants }) => {
  return (
    <div className="trip-members-list">
      <h2>Trip Members</h2>
      <ul>
        {participants.map((member, index) => (
          // Render the participant's name or username
          <li key={index}>{member.name || member.username || 'Unknown Member'}</li>
        ))}
      </ul>
    </div>
  );
};

export default TripMembersList;
