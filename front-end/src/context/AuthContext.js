// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(''); // New state for username

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    setUsername(''); // Clear username on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, setUsername, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
