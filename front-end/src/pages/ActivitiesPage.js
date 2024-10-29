import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupTripPictureCard from '../components/activities/GroupTripPictureCard';
import ActivityCard from '../components/activities/ActivityCard';
import './ActivitiesPage.css';
import { Link, useParams } from 'react-router-dom'; //this is for the dynamic routing

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]); 
  const [error, setError] = useState(null); 
  const { locationId } = useParams(); //this gets the locationId from the route (look at App.js if you are confused)

  useEffect(() => {
    
    axios
      .get(`https://mock-api-misty-fog-1131.fly.dev/api/locations/${locationId}/activities`) //this is the dynamic route
      .then((response) => {
        console.log('API Response:', response.data); 
        setActivities(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching activities:', error); // Log error
        setError('Failed to fetch activities'); // Set error message
      });
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="activities-page">
      <GroupTripPictureCard tripName="New York City Spring Break Trip" tripId={101} />

      <div className="tabs">
        <button>Food</button>
        <button>Activities</button>
        <button>Stay</button>
        <Link to={`/add-activity/${locationId}`} className="add-activity-link">
          Create Activity
        </Link>
      </div>

      {error ? ( // Show error if present
        <p>{error}</p>
      ) : (
        <div className="activity-list">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              title={activity.name}
              description={activity.description}
              votes={activity.votes}
              price={activity.price ? `$${activity.price}` : 'Free'}
              comments={activity.comments.map((c) => c.commentString)}
              imageUrl={activity.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitiesPage;
