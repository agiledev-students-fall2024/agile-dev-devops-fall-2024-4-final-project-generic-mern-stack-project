import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupTripPictureCard from '../components/activities/GroupTripPictureCard';
import ActivityCard from '../components/activities/ActivityCard';
import './ActivitiesPage.css';
import { Link, useParams } from 'react-router-dom';

const ActivitiesPage = () => {
  const { locationId } = useParams(); // Gets the locationId from the route
  const [activities, setActivities] = useState([]); 
  const [locationName, setLocationName] = useState("Activities");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/locations/${locationId}`)
      .then((locationResponse) => {
        setLocationName(locationResponse.data.name);
  
        return axios.get(`http://localhost:3002/activities/location/${locationId}`);
      })
      .then((activitiesResponse) => {
        setActivities(activitiesResponse.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch activities or location details');
      });
  }, [locationId]);
  

  return (
    <div className="activities-page">
      <GroupTripPictureCard tripName={locationName} tripId={locationId} /> {/* Display location name */}

      <div className="tabs">
        <button>Food</button>
        <button>Activities</button>
        <button>Stay</button>
        <Link to={`/add-activity/${locationId}`} className="add-activity-link">
          Create Activity
        </Link>
      </div>

      {error ? (
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
              isCompleted={activity.isCompleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitiesPage;
