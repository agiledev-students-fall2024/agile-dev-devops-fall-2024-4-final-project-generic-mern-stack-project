/*eslint-disable no-unused-vars*/
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

  function removeLikedRestaurant(restaurant) {
    setAccountInfo((prev) => {
      // Create a new User object, preserving other fields
      const updatedAccount = new User(
        prev.id,
        prev.email,
        [prev.likedRestaurants.splice(prev.likedRestaurants.indexOf(restaurant))]  // Add the new restaurant
      );
      return updatedAccount;
    });
  };

  return (
    <AccountInfoContext.Provider
      value={{
        accountInfo,
        setAccountInfo,
        addLikedRestaurant,
        User,
      }}
    >
      {children}
    </AccountInfoContext.Provider>
  );
};
