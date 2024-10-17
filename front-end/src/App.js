// src/App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/Navbar";
import SwipableFeed from "./components/SwipableFeed";
import ProfilePage from "./components/Profile";
import { fetchRestaurants } from "./api/Restaurant";
import "./App.css";

function App() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const getRestaurants = async () => {
      const data = await fetchRestaurants();
      setRestaurants(data);
    };

    getRestaurants();
  }, []);

  return (
    <Router>
      <NavBar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route
            path="/feed"
            element={<SwipableFeed restaurants={restaurants} />}
          />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
