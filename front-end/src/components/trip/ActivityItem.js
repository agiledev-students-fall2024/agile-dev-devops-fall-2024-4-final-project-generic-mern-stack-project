import React from 'react';
//import './ActivityItem.css'; 

const ActivityItem = ({ title }) => (
  <div className="activity-item">
    <p className="activity-title">{title}</p>
    <div className="vote-buttons">
      <button>↑</button>
      <button>↓</button>
    </div>
  </div>
);

export default ActivityItem;
