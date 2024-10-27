import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GroupTripPictureCard from '../components/activities/GroupTripPictureCard';
import PastActivityCard from '../components/activities/PastActivityCard';
import './PastTrip.css';

const PastTrip = () => {
  const [activities, setActivities] = useState([]);
  const [tripName, setTripName] = useState("Past Trip Details");
  const [error, setError] = useState(null);
  const tripId = "trip_456"; 

  useEffect(() => {
   
    axios
      .get(`https://mock-api-misty-fog-1131.fly.dev/api/trips/${tripId}`)
      .then((tripResponse) => {
        const locationId = tripResponse.data.locations[0]; 
        setTripName(tripResponse.data.name); 

        
        return axios.get(`https://mock-api-misty-fog-1131.fly.dev/api/locations/${locationId}`);
      })
      .then((locationResponse) => {
        setTripName(locationResponse.data.name); 

        
        return axios.get(`https://mock-api-misty-fog-1131.fly.dev/api/locations/${locationResponse.data.id}/activities`);
      })
      .then((activitiesResponse) => {
        setActivities(activitiesResponse.data); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      });
  }, []);

  return (
    <div className="past-activities-page">
      <GroupTripPictureCard tripName={tripName} tripId={101} /> 

      <div className="past-tabs">
        <button>Food</button>
        <button>Activities</button>
        <button>Stay</button>
      </div>

      {error ? (
        <p>{error}</p>
      ) : (
        <div className="past-activity-list">
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
