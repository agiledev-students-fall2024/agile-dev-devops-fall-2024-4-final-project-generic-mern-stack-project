import React, { createContext, useState } from "react";
import { User, fetchUser } from "../api/User";

export const AccountInfoContext = createContext();

export const AccountInfoProvider = ({ children }) => {
  const [accountInfo, setAccountInfo] = useState(new User("123", "amosbloomberg@gmail.com", []));

  function addLikedRestaurant(restaurant) {
    setAccountInfo((prev) => {
      // Create a new User object, preserving other fields
      const updatedAccount = new User(
        prev.id,
        prev.email,
        [...prev.likedRestaurants, restaurant]  // Add the new restaurant
      );
      return updatedAccount;
    });
  };

  return (
    <AccountInfoContext.Provider
      value={{
        accountInfo,
        addLikedRestaurant,
        setAccountInfo,
      }}
    >
      {children}
    </AccountInfoContext.Provider>
  );
};
