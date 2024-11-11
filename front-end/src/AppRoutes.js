// src/AppRoutes.js

import React, { useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SwipableFeed from "./components/SwipableFeed";
import ProfilePage from "./components/Profile";
import Login from "./Login";
import { AuthContext } from "../src/contexts/AuthContext";
import Navbar from "./components/Navbar";

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/feed" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/feed"
        element={
          isAuthenticated ? (
            <>
              <Navbar setSelectedRestaurant={setSelectedRestaurant} />
              <SwipableFeed selectedRestaurant={selectedRestaurant} />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/profile"
        element={
          isAuthenticated ? (
            <>
              <Navbar />
              <ProfilePage />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
