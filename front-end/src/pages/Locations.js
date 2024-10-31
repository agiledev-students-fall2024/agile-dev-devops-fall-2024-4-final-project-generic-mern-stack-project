import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LocationCard from '../components/location/LocationCard';
import './Locations.css';
import axios from 'axios';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [tripStatus, setTripStatus] = useState("ongoing"); 
  const [loading, setLoading] = useState(true);
  const { tripId } = useParams();

  const fetchLocationsAndStatus = async () => {
    try {
      const locationsResponse = await axios.get(
        `https://mock-api-misty-fog-1131.fly.dev/api/trips/${tripId}/locations`
      );
      setLocations(locationsResponse.data);

      const tripResponse = await axios.get(
        `https://mock-api-misty-fog-1131.fly.dev/api/trips/${tripId}`
      );
      setTripStatus(tripResponse.data.status);
    } catch (error) {
      console.error('Error fetching locations or trip status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocationsAndStatus();
  }, []);

  const handleStatusChange = (e) => {
    setTripStatus(e.target.value);
  };

  if (loading) return <p>Loading locations...</p>;

  return (
    <div className="locations-page">
      <div className="locations-header">
        <h1>Locations</h1>
        <select
          className="status-dropdown"
          value={tripStatus}
          onChange={handleStatusChange}
        >
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="upcoming">Upcoming</option>
        </select>
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
            tripStatus={tripStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default Locations;
