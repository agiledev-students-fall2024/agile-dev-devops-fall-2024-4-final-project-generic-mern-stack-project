import React, { useEffect, useState } from 'react';
import LocationCard from '../components/location/LocationCard';
import './Locations.css';

const Locations = () => {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    const hardcodedLocations = [ //i just hardcoded the data but in a way that mimics an api call
      {
        tripId: 1,
        id: 101,
        name: 'Eiffel Tower',
        address: 'Champ de Mars, Paris, France',
        activities: [201, 202],
      },
      {
        tripId: 2,
        id: 102,
        name: 'Central Park',
        address: 'New York, NY, USA',
        activities: [203, 204],
      },
      {
        tripId: 1,
        id: 103,
        name: 'Louvre Museum',
        address: 'Rue de Rivoli, Paris, France',
        activities: [205],
      },
      {
        tripId: 2,
        id: 104,
        name: 'Times Square',
        activities: [],
      },
    ];

    // this is just for fun, haha, it delays a simulation so it seems like a real api call lol
    await new Promise((resolve) => setTimeout(resolve, 500));

    setLocations(hardcodedLocations);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="locations-grid">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
};

export default Locations;
