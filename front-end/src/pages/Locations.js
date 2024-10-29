// Locations.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LocationCard from '../components/location/LocationCard';
import './Locations.css';
import axios from 'axios';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [tripStatus, setTripStatus] = useState(null); // State to hold the trip status
  const [loading, setLoading] = useState(true);
  const { tripId } = useParams();

  const fetchLocationsAndStatus = async () => {
    try {
      // Fetch locations
      const locationsResponse = await axios.get(
        `https://mock-api-misty-fog-1131.fly.dev/api/trips/${tripId}/locations`
      );
      setLocations(locationsResponse.data);

      // Fetch trip details to get the status
      const tripResponse = await axios.get(
        `https://mock-api-misty-fog-1131.fly.dev/api/trips/${tripId}`
      );
      setTripStatus(tripResponse.data.status); // Set the trip status (e.g., 'completed' or 'ongoing')
    } catch (error) {
      console.error('Error fetching locations or trip status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocationsAndStatus();
  }, []);

  if (loading) return <p>Loading locations...</p>;

  return (
    <div className="locations-page">
      <div className="locations-header">
        <h1>Locations</h1>
        {tripStatus !== 'completed' && (
          <Link to={`/add-location/${tripId}`} className="add-location-link">
            Add Location
          </Link>
        )}
      </div>
      <div className="locations-grid">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            tripStatus={tripStatus} // Pass trip status to each LocationCard
          />
        ))}
      </div>
    </div>
  );
};

export default Locations;



//if the Mock API shuts down, use these hardcoded locations instead:
  // const fetchLocations = async () => {
  //   const hardcodedLocations = [ //i just hardcoded the data but in a way that mimics an api call
  //     {
  //       tripId: 1,
  //       id: 101,
  //       name: 'Eiffel Tower',
  //       address: 'Champ de Mars, Paris, France',
  //       activities: [201, 202],
  //     },
  //     {
  //       tripId: 2,
  //       id: 102,
  //       name: 'Central Park',
  //       address: 'New York, NY, USA',
  //       activities: [203, 204],
  //     },
  //     {
  //       tripId: 1,
  //       id: 103,
  //       name: 'Louvre Museum',
  //       address: 'Rue de Rivoli, Paris, France',
  //       activities: [205],
  //     },
  //     {
  //       tripId: 2,
  //       id: 104,
  //       name: 'Times Square',
  //       activities: [],
  //     },
  //   ];
  //   // this is just for fun, haha, it delays a simulation so it seems like a real api call lol
  //   await new Promise((resolve) => setTimeout(resolve, 500));
  //   setLocations(hardcodedLocations);
  // };
