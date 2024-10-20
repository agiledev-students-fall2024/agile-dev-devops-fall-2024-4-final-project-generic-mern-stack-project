import React, { createContext, useState } from "react";

export const AccountInfoContext = createContext();

export const AccountInfoProvider = ({ children }) => {
  const [accountInfo, setAccountInfo] = useState({
    username: "JohnDoe",
    email: "john.doe@example.com",
    likedRestaurants: [],
  });

  const addLikedRestaurant = (restaurant) => {
    setAccountInfo((prev) => ({
      ...prev,
      likedRestaurants: [...prev.likedRestaurants, restaurant],
    }));
  };

  return (
    <AccountInfoContext.Provider value={{ accountInfo, addLikedRestaurant }}>
      {children}
    </AccountInfoContext.Provider>
  );
};
