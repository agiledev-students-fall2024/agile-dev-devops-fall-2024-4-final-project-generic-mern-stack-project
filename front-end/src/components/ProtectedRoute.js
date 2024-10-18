import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, element, navigateTo }) => (
  isAuthenticated ? element : <Navigate to={navigateTo} />
)

export default ProtectedRoute
