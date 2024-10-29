import React, { createContext, useState } from "react";

export const SwipableFeedContext = createContext();

export const SwipableFeedProvider = ({ children }) => {
  const [allrestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filters, setFilters] = useState([])

  return (
    <SwipableFeedContext.Provider value={{ allrestaurants, setAllRestaurants, filteredRestaurants, setFilteredRestaurants, setFilters }}>
      {children}
    </SwipableFeedContext.Provider>
  )
}
