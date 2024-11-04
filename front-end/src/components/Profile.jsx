/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useContext } from 'react';
import '../styles/Profile.css';
import { AccountInfoContext } from '../contexts/AccountInfoContext';
import RestaurantListItem from './RestaurantListItem';


const ProfilePage = () => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [savedRestaurants, setSavedRestaurants] = useState({});
  const [filterCuisine, setFilterCuisine] = useState("All");
  const [filterNeighborhood, setFilterNeighborhood] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const { accountInfo, setAccountInfo  } = useContext(AccountInfoContext);

  const handleDelete = (restaurantToDelete) => {
    setAccountInfo(prevState => ({
      ...prevState,
      likedRestaurants: prevState.likedRestaurants.filter(
        restaurant => restaurant.id !== restaurantToDelete.id
      )
    }));
  };


  const filteredRestaurants = Object.keys(savedRestaurants).filter((id) => {
    const restaurant = savedRestaurants[id];
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
          <img src={profilePic || "default-profile-pic.jpg"} alt="Profile" />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{name || "User's Name"}</h2>
          <p className="profile-phone">{phoneNumber || "Phone Yet to be Set"}</p>
        </div>
      </div>

      <h2>Saved Restaurants</h2>
      
      {accountInfo.likedRestaurants.length > 0 ? (
        accountInfo.likedRestaurants.map((restaurant) => (
          <RestaurantListItem 
            key={restaurant.id} 
            restaurant={restaurant} 
            onDelete={() => handleDelete(restaurant)}
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
