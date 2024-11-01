import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LocationCard from '../components/location/LocationCard';
import TripMembersList from '../components/location/TripMembersList';
import './Locations.css';
import axios from 'axios';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [tripStatus, setTripStatus] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [showMembers, setShowMembers] = useState(false); //this decides whether or not to show the members list
  const [participants, setParticipants] = useState([]); // i think i need to use state here?
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

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://mock-api-misty-fog-1131.fly.dev/api/trips/${tripId}`
      );
      const participants = response.data.participants;
      setParticipants(participants);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };
  
  useEffect(() => {
    fetchLocationsAndStatus();
  }, []);

  const toggleMembersList = () => { //determines whether or not memberslist is shown
    setShowMembers((prev) => !prev);
    if (showMembers && participants.length === 0) {fetchUsers();}; //get the members if participants list not populated yet
  };

  if (loading) return <p>Loading locations...</p>;

  return (
    <div className="locations-page">
      <div className="locations-header">
        <h1>Locations</h1>
        <button onClick={toggleMembersList} className="toggle-members-button">
          {showMembers ? "Hide Members" : "Show Members"}
        </button>
        {tripStatus !== 'completed' && (
          <Link to={`/add-location/${tripId}`} className="add-location-link">
            Add Location
          </Link>
        )}
      </div>
      {showMembers && <TripMembersList participants={participants}/>}
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
