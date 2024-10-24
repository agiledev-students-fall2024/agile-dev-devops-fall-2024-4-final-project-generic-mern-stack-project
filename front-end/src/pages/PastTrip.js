import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PastActivities from '../components/past/PastActivities'; // Import PastActivities
import TripDetails from '../components/past/TripDetails'; // Import TripDetails
import './PastTrip.css';

const PastTrip = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [groupImage, setGroupImage] = useState('');

  useEffect(() => {
    const fetchedTrip = {
      id,
      title: `Trip to Destination ${id}`,
      description: `This is a detailed description of trip ${id}.`,
      days: [
        {
          day: 1,
          activities: ['Visited a famous landmark', 'Tried local cuisine', 'Explored the city'],
        },
        {
          day: 2,
          activities: ['Visited a museum', 'Explored a popular neighborhood', 'Visited a historic site'],
        },
        {
          day: 3,
          activities: ['Relaxed at a local cafe', 'Took a scenic tour', 'Shopped at local stores'],
        },
      ],
    };
    setTrip(fetchedTrip);

    const imageUrl = `https://picsum.photos/1200/400?random=${id}`;
    setGroupImage(imageUrl);
  }, [id]);

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="past-trip">
      <div className="past-trip__image-wrapper">
        <img src={groupImage} alt={trip.title} className="past-trip__image" />
      </div>

      {/* Use TripDetails component for title and description */}
      <TripDetails title={trip.title} description={trip.description} />

      {/* Use PastActivities component for day-wise activities */}
      {trip.days.map((dayData, index) => (
        <PastActivities key={index} day={dayData.day} activities={dayData.activities} />
      ))}
    </div>
  );
};

export default PastTrip;
