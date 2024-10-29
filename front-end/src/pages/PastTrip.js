// PastTrip.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GroupTripPictureCard from '../components/activities/GroupTripPictureCard';
import PastActivityCard from '../components/activities/PastActivityCard';
import './PastTrip.css';

const PastTrip = () => {
  const { locationId } = useParams(); // Retrieve locationId from URL
  const [activities, setActivities] = useState([]);
  const [locationName, setLocationName] = useState("Past Trip Details");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch location details and activities using locationId
    const fetchLocationData = async () => {
      try {
        // Fetch location name and other details
        const locationResponse = await axios.get(
          `https://mock-api-misty-fog-1131.fly.dev/api/locations/${locationId}`
        );
        setLocationName(locationResponse.data.name); // Set the location name

        // Fetch activities associated with this location
        const activitiesResponse = await axios.get(
          `https://mock-api-misty-fog-1131.fly.dev/api/locations/${locationId}/activities`
        );
        setActivities(activitiesResponse.data); // Set activities data
      } catch (error) {
        console.error('Error fetching location data:', error);
        setError('Failed to load past trip data');
      }
    };

    fetchLocationData();
  }, [locationId]); // Run effect whenever locationId changes

  return (
    <div className="past-activities-page">
      <GroupTripPictureCard tripName={locationName} tripId={locationId} />

      <div className="past-tabs">
        <button>Food</button>
        <button>Activities</button>
        <button>Stay</button>
      </div>

      {error ? (
        <p>{error}</p> // Display error message if data fetch fails
      ) : (
        <div className="past-activity-list">
          {activities.map((activity) => (
            <PastActivityCard
              key={activity.id}
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
