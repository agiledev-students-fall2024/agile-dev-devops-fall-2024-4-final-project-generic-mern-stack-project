/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useContext } from 'react';
import '../styles/Profile.css';
import { AccountInfoContext } from '../contexts/AccountInfoContext';
import { User } from '../contexts/AccountInfoContext';
import RestaurantListItem from './RestaurantListItem';

const ProfilePage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filterCuisine, setFilterCuisine] = useState("All");
  const [filterNeighborhood, setFilterNeighborhood] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const { accountInfo, setAccountInfo } = useContext(AccountInfoContext);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure that you want to delete this restaurant?"
    );
    if (confirmed) {
      const updatedRestaurants = { ...accountInfo.likedRestaurants };
      delete updatedRestaurants[id];
      setAccountInfo((prev) => {new User(prev.id, prev.email, updatedRestaurants)});
    }
  };

  const uniqueCuisines = Array.from(
    new Set(Object.values(accountInfo.likedRestaurants).map((r) => r.cuisine))
  );
  const uniqueNeighborhoods = Array.from(
    new Set(Object.values(accountInfo.likedRestaurants).map((r) => r.neighborhood))
  );

  const filteredRestaurants = Object.keys(accountInfo.likedRestaurants).filter((id) => {
    const restaurant = accountInfo.likedRestaurants[id];
    const cuisineMatch =
      filterCuisine === "All" || restaurant.cuisine === filterCuisine;
    const neighborhoodMatch =
      filterNeighborhood === "All" ||
      restaurant.neighborhood === filterNeighborhood;
    const priceMatch =
      filterPrice === "All" ||
      (filterPrice === "$1-15" && restaurant.priceRange <= 15) ||
      (filterPrice === "$16-25" &&
        16 >= restaurant.priceRange &&
        restaurant.priceRange <= 25) ||
      (filterPrice === "$26-49" &&
        26 >= restaurant.priceRange &&
        restaurant.priceRange <= 49) ||
      (filterPrice === "$50+" && restaurant.priceRange >= 50);

    const statusMatch =
      filterStatus === "All" || restaurant.status === filterStatus;

    return cuisineMatch && neighborhoodMatch && priceMatch && statusMatch;
  });

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <div className="profile-card">
        <div className="profile-photo">
          <img
            src={accountInfo.profilePic || "default-profile-pic.jpg"}
            alt={`${accountInfo.email}'s profile`}
            className="profile-pic"
          />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{accountInfo.email || "User's Name"}</h2>
          <p className="profile-phone">{phoneNumber || "Phone Yet to be Set"}</p>
        </div>
      </div>
  
      <h2>Saved Restaurants</h2>
      
      {Object.keys(accountInfo.likedRestaurants).length > 0 ? (
        Object.entries(accountInfo.likedRestaurants).map(([id, restaurant]) => (
          <RestaurantListItem 
            key={id} 
            restaurant={restaurant} 
            onDelete={() => handleDelete(id)}
          />
        ))
      ) : (
        <p className="no-liked-restaurants">
          You haven't liked any restaurants yet.
        </p>
      )}
    </div>
  );
};

export default ProfilePage;
