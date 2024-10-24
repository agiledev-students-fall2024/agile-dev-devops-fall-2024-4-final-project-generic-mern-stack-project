// src/pages/ActivitiesPage/ActivitesPage.js
import React from 'react';
import ActivityItem from '../../components/trip/ActivityItem'; 

const ActivitiesPage = () => {
  const activities = ['Hiking', 'Museum Visit', 'Beach Day'];

  return (
    <div className="activities-page">

      <div className="trip-image">
        <h2>TripName</h2>
        <div className="image-container">
          <p>Group trip picture</p>
        </div>
      </div>

      <div className="tabs">
        <button>Food</button>
        <button>Activities</button>
        <button>Stay</button>
        <button className="new-activity-button">Create a new activity</button>
      </div>

      <div className="activity-list">
        {activities.map((activity, index) => (
          <ActivityItem key={index} title={activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;
