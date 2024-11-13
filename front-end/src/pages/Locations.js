import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LocationCard from '../components/location/LocationCard';
import TripMembersList from '../components/location/TripMembersList';
import './Locations.css';
import axios from 'axios';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [tripStatus, setTripStatus] = useState("ongoing"); 
  const [loading, setLoading] = useState(true);
  const [showMembers, setShowMembers] = useState(false);
  const [participants, setParticipants] = useState([]);
  const { tripId } = useParams();

  const fetchLocationsAndStatus = async () => {
    try {
      const locationsResponse = await axios.get(`/trips/${tripId}/locations`);
      setLocations(locationsResponse.data);

      const tripResponse = await axios.get(`/trips/${tripId}`);
      setTripStatus(tripResponse.data.status);
    } catch (error) {
      console.error('Error fetching locations or trip status:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/trips/${tripId}`);
      const participants = response.data.participants;
      setParticipants(participants);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };
  
  useEffect(() => {
    fetchLocationsAndStatus();
  }, []);

  const handleStatusChange = (e) => {
    setTripStatus(e.target.value);
  };

  const toggleMembersList = () => {
    setShowMembers((prev) => !prev);
    if (!showMembers && participants.length === 0) {
      fetchUsers();
    }
  };

  if (loading) return <p>Loading locations...</p>;

  return (
    <div className="locations-page">
      <div className="locations-header">
        <h1>Locations</h1>
        <div className="header-right">
          {tripStatus !== 'completed' && (
            <Link to={`/add-location/${tripId}`} className="add-location-link">
              Add Location
            </Link>
          )}
          <button onClick={toggleMembersList} className="toggle-members-button">
            {showMembers ? "Hide Members" : "Show Members"}
          </button>
          <select
            className="status-dropdown"
            value={tripStatus}
            onChange={handleStatusChange}
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      </div>
      {showMembers && <TripMembersList participants={participants} />}
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
