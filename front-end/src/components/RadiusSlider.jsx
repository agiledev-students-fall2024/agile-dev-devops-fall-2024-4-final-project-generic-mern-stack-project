import React, { useState } from 'react';

const LocationRadiusSlider = () => {
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(0);
  const [error, setError] = useState(null);

  // Request user location
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Handle slider change
  const handleSliderChange = (event) => {
    setRadius(event.target.value);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Location Radius Selector</h1>
      <button onClick={requestLocation}>Get Location</button>

      {location && (
        <div style={{ marginTop: '20px' }}>
          <h3>Current Location:</h3>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>

          <h3>Select Radius (miles):</h3>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={radius}
            onChange={handleSliderChange}
            style={{ width: '300px' }}
          />
          <div style={{ marginTop: '10px' }}>
            <strong>{radius} miles</strong>
          </div>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LocationRadiusSlider;
