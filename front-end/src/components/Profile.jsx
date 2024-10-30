import React, { useState, useEffect, useContext } from 'react';
import '../styles/Profile.css';
import { AccountInfoContext } from '../contexts/AccountInfoContext';
import RestaurantListItem from './RestaurantListItem';
import { User } from '../api/User';

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
      <h2>Profile Page</h2>
      <div className="header">
        <div className="profile-elements">
          <img
            src={accountInfo.profilePic}
            alt={`${accountInfo.email}'s profile`}
            className="profile-pic"
          />
          <div className="profile-info">
            <h2>{accountInfo.email}</h2>
            <p>{phoneNumber}</p>
          </div>
        </div>
      </div>

      <h2>Liked Restaurants</h2>

      <div className="filters">
        {/* ... (filter controls remain the same) */}
      </div>

      <div className="body">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((id) => {
            const restaurant = accountInfo.likedRestaurants[id];
            return (
              <div className="restaurant-card" key={id}>
                <img
                  src={restaurant.photo}
                  alt={`${restaurant.name}`}
                  className="restaurant-photo"
                />
                <div className="restaurant-info">
                  <h2>{restaurant.name}</h2>
                  <div className="restaurant-tags">
                    <span className="tag">{restaurant.cuisine}</span>
                    <span className="tag">{restaurant.neighborhood}</span>
                    <span className="tag">{restaurant.priceRange}</span>
                    <span className="tag">{restaurant.status}</span>
                  </div>
                  <button onClick={() => handleDelete(id)}>Delete</button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No restaurants liked.</p>
        )}
      </div>

      {accountInfo.likedRestaurants.length > 0 ? (
        accountInfo.likedRestaurants.map((restaurant) => (
          <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
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
