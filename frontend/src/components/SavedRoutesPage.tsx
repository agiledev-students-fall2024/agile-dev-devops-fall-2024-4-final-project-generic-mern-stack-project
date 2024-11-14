import sampleStores from "@/stores";
import { SavedRoute } from "@/types";
import AddUpdateRouteButton from "./AddUpdateRouteButton";
import CopyLinkButton from "./CopyLinkButton";
import DeleteRouteButton from "./DeleteRouteButton";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SavedRoutesPage() {
  const navigate = useNavigate();
  const [savedRoutes, setSavedRoutes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/routes/saved", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setSavedRoutes(data);
      })
      .catch((error) => {
        console.error("Error fetching saved routes:", error);
      });
  }, []);

  const routeItems = savedRoutes.map((route) => (
    <div
      key={route._id}
      className="flex justify-between border-2 bg-green-200 hover:bg-green-300  border-green-400 rounded-sm p-2"
    >
      <div
        className="flex flex-col gap-2 min-w-[90%]"
        onClick={() => navigate(`/route/${route._id}`)}
      >
        <span className="text-2xl font-semibold">{route.name}</span>
        <div className="text-sm">{route.description}</div>
        <div className="text-xs text-wrap">
          {route.stores.slice(0, 3).map((store, i) => (
            <span key={store._id} className=" font-light">
              {store.name}
              {i === 2 && route.stores.length > 3
                ? "..."
                : i === route.stores.length - 1
                  ? ""
                  : ", "}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-center">
        <CopyLinkButton routeId={route._id} />
        <AddUpdateRouteButton route={route} type="Update" />
        <DeleteRouteButton route={route} />
      </div>
    </div>
  ));

  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="text-3xl font-bold">Your Saved Routes</div>
      <div className="text-md font-light font-poppins">
        View, edit, or share your saved shopping routes. Click any route to see
        its optimized path.
      </div>
      <div className="flex flex-col gap-5">
        {savedRoutes && savedRoutes.length > 0 ? (
          savedRoutes
        ) : (
          <div className="text-center mt-10 font-poppins">
            You have no saved routes.
          </div>
        )}
      </div>
    </div>
  );
}

const SavedRoutesPage2 = () => {
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
            <p>
              [Interactive Map with Labeled Stores and Path for{" "}
              {selectedRoute.name}]
            </p>
          </div>
        ) : (
          <p>Please select a route to display the map.</p>
        )}
      </div>
      <ul className="store-list">
        {selectedRoute &&
          selectedRoute.stores.map((store, index) => (
            <li key={index}>
              {index + 1}. {store}
            </li>
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
