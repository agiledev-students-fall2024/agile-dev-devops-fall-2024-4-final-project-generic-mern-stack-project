// ActivitiesPage.js
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
    // Fetch the location details to get the name
    axios
      .get(`https://mock-api-misty-fog-1131.fly.dev/api/locations/${locationId}`)
      .then((locationResponse) => {
        setLocationName(locationResponse.data.name); // Set the location name

        // Fetch activities associated with this location
        return axios.get(`https://mock-api-misty-fog-1131.fly.dev/api/locations/${locationId}/activities`);
      })
      .then((activitiesResponse) => {
        setActivities(activitiesResponse.data); // Set activities
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Log error
        setError('Failed to fetch activities'); // Set error message
      });
  }, [locationId]); // Dependency array includes locationId for dynamic loading

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
        <p>{error}</p> // Show error if present
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
