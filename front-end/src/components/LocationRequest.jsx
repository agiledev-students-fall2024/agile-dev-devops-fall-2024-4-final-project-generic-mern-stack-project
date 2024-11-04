import React, { useState } from 'react';

const LocationRequest = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  // Function to request user location
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError(null); // Clear any previous error
        },
        (err) => {
          if (err.code === 1) {
            // User denied location access
            setError('User location is required to use the app. Please allow location access.');
            retryLocationRequest(); // Retry requesting location
          } else {
            setError(err.message);
          }
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Retry location request after a short delay
  const retryLocationRequest = () => {
    setTimeout(() => {
      requestLocation();
    }, 3000); // Retry every 3 seconds
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Request Location</h1>
      {!location && (
        <button onClick={requestLocation}>Get Location</button>
      )}
      {location && (
        <div>
          <h3>Location Details:</h3>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LocationRequest;
