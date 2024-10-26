import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GroupTripPictureCard from '../components/activities/GroupTripPictureCard';
import PastActivityCard from '../components/activities/PastActivityCard';
import './PastTrip.css';

const PastTrip = () => {
  const [activities, setActivities] = useState([]);
  const [tripName, setTripName] = useState("Past Trip Details"); // Default title
  const [error, setError] = useState(null);
  const tripId = "trip_456"; // Replace with dynamic ID if needed

  useEffect(() => {
    // Step 1: Fetch trip details to get location IDs
    axios
      .get(`https://mock-api-misty-fog-1131.fly.dev/api/trips/${tripId}`)
      .then((tripResponse) => {
        const locationId = tripResponse.data.locations[0]; // Get the first location ID
        setTripName(tripResponse.data.name); // Set trip name

        // Step 2: Fetch location details to get the name
        return axios.get(`https://mock-api-misty-fog-1131.fly.dev/api/locations/${locationId}`);
      })
      .then((locationResponse) => {
        setTripName(locationResponse.data.name); // Update title with location name

        // Step 3: Fetch activities for this location
        return axios.get(`https://mock-api-misty-fog-1131.fly.dev/api/locations/${locationResponse.data.id}/activities`);
      })
      .then((activitiesResponse) => {
        setActivities(activitiesResponse.data); // Set activities data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      });
  }, []);

  return (
    <div className="activities-page">
      <GroupTripPictureCard tripName={tripName} tripId={101} /> {/* Dynamically set trip name */}

      <div className="tabs">
        <button>Food</button>
        <button>Activities</button>
        <button>Stay</button>
      </div>

      {error ? (
        <p>{error}</p>
      ) : (
        <div className="activity-list">
          {activities.map((activity) => (
            <PastActivityCard
              key={activity.id}
              id={activity.id}
              title={activity.name}
              description={activity.description}
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

export default PastTrip;
