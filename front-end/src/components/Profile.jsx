import React, { useState, useEffect, useContext } from 'react';
import '../styles/Profile.css';
import { AccountInfoContext } from '../contexts/AccountInfoContext';
import RestaurantListItem from './RestaurantListItem';

/* eslint-disable no-unused-vars */

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [savedRestaurants, setSavedRestaurants] = useState({});
  const [filterCuisine, setFilterCuisine] = useState("All");
  const [filterNeighborhood, setFilterNeighborhood] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  // eslint-disable-next-line
  const { accountInfo } = useContext(AccountInfoContext);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = {}; // Placeholder for the backend data of the restaurants

      setTimeout(() => {
        setSavedRestaurants(data);
      }, 1000);
    };

    fetchRestaurants();
  }, []);

  const handleDelete = (id) => {
    const updatedLikedRestaurants = accountInfo.likedRestaurants.filter(
      (restaurant) => restaurant.id != id;
    )
  };

  

  const uniqueCuisines = Array.from(
    new Set(Object.values(savedRestaurants).map((r) => r.cuisine))
  );
  const uniqueNeighborhoods = Array.from(
    new Set(Object.values(savedRestaurants).map((r) => r.neighborhood))
  );

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
      <h2>Profile Page</h2>
      <div className="header">
        <div className="profile-elements">
          <img
            src={profilePic}
            alt={`${name}'s profile`}
            className="profile-pic"
          />
          <div className="profile-info">
            <h2>{name}</h2>
            <p>{phoneNumber}</p>
          </div>
        </div>
      </div>

      <h2>Saved Restaurants</h2>

      <div className="filters">
        {/* ... (filter controls remain the same) */}
      </div>

      <div className="body">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((id) => {
            const restaurant = savedRestaurants[id];
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
          <p>No restaurants saved.</p>
        )}
      </div>

      {accountInfo.likedRestaurants.length > 0 ? (
        accountInfo.likedRestaurants.map((restaurant) => (
          <>
            <RestaurantListItem 
              key={restaurant.id} 
              restaurant={restaurant} 
            />
            {/*handleDelete={() => handleDelete(restaurant.id)}
              handleStatus={() => handleStatus(restaurant.id)} */}
            <div className="button-container">
              <button className="delete-button" onClick={() => handleDelete(restaurant.id)}>Delete</button>
              <button className="status-button" onClick={() => handleStatus(restaurant.id)}>Change Status</button>
            </div>
            {popupVisible && (
              <div className="popup-screen">
                <div className="popup">
                  <h3>Select Visiting Status</h3>
                  <button onClick={() => selectStatus('Want to Visit')}>Want to Visit</button>
                  <button onClick={() => selectStatus('Previously Visited')}>Previously Visited</button>
                  <button onClick={() => setPopupVisible(false)}>Cancel</button>
                </div>
              </div>
            )}
          </>
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
