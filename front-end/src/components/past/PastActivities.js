import React from 'react';
import './PastActivities.css';

const PastActivities = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return <p>No activities available</p>;  // Display fallback if no activities
  }

  return (
    <div className="past-activities">
      <h3 className="past-activities__title">Activities</h3>
      <ul className="past-activities__list">
        {activities.map((activity, index) => (
          <li key={index} className="past-activities__item">
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastActivities;
