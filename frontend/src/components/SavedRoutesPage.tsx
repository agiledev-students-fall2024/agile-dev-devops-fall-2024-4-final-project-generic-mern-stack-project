import React, { useState, useEffect } from "react";

const SavedRoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Fetch saved routes from the API
  useEffect(() => {
    fetch("/api/routes")
      .then((response) => response.json())
      .then((data) => setRoutes(data))
      .catch((error) => console.error("Error fetching routes:", error));
  }, []);

  // Select a route to display on the map and show stores
  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
  };

  // Placeholder function for saving route
  const handleSaveRoute = () => {
    console.log("Route saved!");
    // API call to save the route would go here
  };

  return (
    <div className="saved-routes-page">
      <header>
        <img src="path/to/logo.png" alt="Logo" />
        <h2>Your Shopping Route</h2>
      </header>
      <div className="map-container">
        {selectedRoute ? (
          <div>
            <p>[Interactive Map with Labeled Stores and Path for {selectedRoute.name}]</p>
          </div>
        ) : (
          <p>Please select a route to display the map.</p>
        )}
      </div>
      <ul className="store-list">
        {selectedRoute &&
          selectedRoute.stores.map((store, index) => (
            <li key={index}>{index + 1}. {store}</li>
          ))}
      </ul>
      <div className="button-container">
        <button onClick={handleSaveRoute}>Save This Route</button>
        <button onClick={() => setSelectedRoute(null)}>Back to Start</button>
      </div>
      <ul className="route-list">
        {routes.map((route) => (
          <li key={route.id} onClick={() => handleSelectRoute(route)}>
            {route.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedRoutesPage;
