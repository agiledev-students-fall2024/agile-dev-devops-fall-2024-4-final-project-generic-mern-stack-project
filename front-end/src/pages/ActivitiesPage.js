import React, { useState } from 'react';
import GroupTripPictureCard from '../components/activities/GroupTripPictureCard';
import ActivityCard from '../components/activities/ActivityCard';
import './ActivitiesPage.css';

const ActivitiesPage = () => {
  const [activities] = useState([
    {
      id: 1,
      title: 'Hiking',
      votes: 10,
      description: 'Explore scenic trails and enjoy nature.',
      price: '$$',
      comments: ['Looks fun!', 'Can’t wait to join!'],
    },
    {
      id: 2,
      title: 'Museum Visit',
      votes: 8,
      description: 'A tour of the local art and history museum.',
      price: '$$$',
      comments: ['This sounds interesting.', 'See you there!'],
    },
    {
      id: 3,
      title: 'Beach Day',
      votes: 12,
      description: 'Relax at the beach with sun and surf.',
      price: '$$',
      comments: ['Perfect weather for the beach!', 'I’ll bring snacks!'],
    },
  ]);

  return (
    <div className="activities-page">
      <GroupTripPictureCard tripName="New York City Spring Break Trip" tripId={101} />

      <div className="tabs">
        <button>Food</button>
        <button>Activities</button>
        <button>Stay</button>
        <button className="new-activity-button">Create a new activity</button>
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} {...activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;
