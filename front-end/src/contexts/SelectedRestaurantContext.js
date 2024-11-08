import React, { createContext, useState } from 'react';

export const SelectedRestaurantContext = createContext();

export const SelectedRestaurantProvider = ({ children }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <SelectedRestaurantContext.Provider value={{ selectedRestaurant, setSelectedRestaurant }}>
      {children}
    </SelectedRestaurantContext.Provider>
  );
};