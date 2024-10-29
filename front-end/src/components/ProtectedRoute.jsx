import React from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import SideNavBar from './sideNavBar';

function ProtectedRoute({ isLoggedIn, handleLogout }) {
  const location = useLocation();

  return (
    <>
      {isLoggedIn && location.pathname !== '/transactions' && (
        <SideNavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      )}
      <Outlet /> 
    </>
  );
}

export default ProtectedRoute;
