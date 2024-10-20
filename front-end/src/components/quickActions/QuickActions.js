import React from 'react';
import './QuickActions.css';

const QuickActions = () => {
  return (
    <div className="quick-actions">
      <a href="/join-trip" className="quick-actions__link">Join a new trip</a>
      <a href="/create-trip" className="quick-actions__link">Create a new trip</a>
    </div>
  );
};

export default QuickActions;
