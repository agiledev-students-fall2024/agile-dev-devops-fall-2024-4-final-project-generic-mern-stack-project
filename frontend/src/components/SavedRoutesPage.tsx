import sampleStores from "@/stores";
import { SavedRoute } from "@/types";
import UpdateSavedRouteButton from "./UpdateSavedRouteButton";
import CopyLinkButton from "./CopyLinkButton";
import DeleteRouteButton from "./DeleteRouteButton";

const sampleSavedRoutes: SavedRoute[] = [
  {
    id: "1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit at alias natus nostrum quas assumenda inventore animi perferendis sequi. Quos eligendi sapiente error alias aspernatur dolores eum, voluptas possimus quaerat!",
    name: "saved route 1",
    stores: sampleStores,
  },
  {
    id: "2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit at alias natus nostrum quas assumenda inventore animi perferendis sequi. Quos eligendi sapiente error alias aspernatur dolores eum, voluptas possimus quaerat!",
    name: "saved route 2",
    stores: sampleStores,
  },
];

export default function SavedRoutesPage() {
  const savedRoutes = sampleSavedRoutes.map((route) => (
    <div
      key={route.id}
      className="flex justify-between border-2 bg-green-200 hover:bg-green-300  border-green-400 rounded-sm p-2"
    >
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-semibold">{route.name}</span>
        <div className="text-sm">{route.description}</div>
        <div className="text-xs text-wrap">
          {route.stores.slice(0, 3).map((store, i) => (
            <span key={store._id} className=" font-light">
              {store.name}, {i === 2 && route.stores.length > 3 ? "..." : ""}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 my-auto">
        <CopyLinkButton routeId={route.id} />
        <UpdateSavedRouteButton route={route} />
        <DeleteRouteButton route={route} />
      </div>
    </div>
  ));

  return (
    <div className="p-5">
      <div className="text-3xl font-bold mb-8">Your Saved Routes</div>
      <div className="flex flex-col gap-5">{savedRoutes}</div>
    </div>
  );
}
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
