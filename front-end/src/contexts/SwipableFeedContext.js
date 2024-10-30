import React, { createContext, useState } from "react";

export const SwipableFeedContext = createContext();

export const SwipableFeedProvider = ({ children }) => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filters, setFilters] = useState([])

  return (
    <SwipableFeedContext.Provider value={{ allRestaurants, setAllRestaurants, filteredRestaurants, setFilteredRestaurants, setFilters }}>
      {children}
    </SwipableFeedContext.Provider>
  )
}
