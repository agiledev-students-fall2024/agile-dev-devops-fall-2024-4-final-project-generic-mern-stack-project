import React, { useState, useEffect, useContext } from 'react';
import '../styles/Profile.css';
import { AccountInfoContext } from '../contexts/AccountInfoContext';
import RestaurantListItem from './RestaurantListItem';
import { Typography } from '@mui/material';


const ProfilePage = () => {
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [profilePic, setProfilePic] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [phoneNumber, setPhoneNumber] = useState("");
  const [savedRestaurants, setSavedRestaurants] = useState({}); 
  const [filterCuisine, setFilterCuisine] = useState("All");
  const [filterNeighborhood, setFilterNeighborhood] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
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
    const confirmed = window.confirm("Are you sure that you want to delete this restaurant?"); 
    if (confirmed) {
      const updatedRestaurants = { ...savedRestaurants };
      delete updatedRestaurants[id];
      setSavedRestaurants(updatedRestaurants);
    }
  };

  const uniqueCuisines = Array.from(new Set(Object.values(savedRestaurants).map(r => r.cuisine)));
  const uniqueNeighborhoods = Array.from(new Set(Object.values(savedRestaurants).map(r => r.neighborhood)));

  const filteredRestaurants = Object.keys(savedRestaurants).filter(id => {

    const restaurant = savedRestaurants[id];
    const cuisineMatch = filterCuisine === "All" || restaurant.cuisine === filterCuisine;
    const neighborhoodMatch = filterNeighborhood === "All" || restaurant.neighborhood === filterNeighborhood;
    const priceMatch = filterPrice === "All" || 
      (filterPrice === "$1-15" && restaurant.priceRange <= 15) ||
      (filterPrice === "$16-25" && 16 >=restaurant.priceRange && restaurant.priceRange <= 25) ||
      (filterPrice === "$26-49" && 26 >= restaurant.priceRange && restaurant.priceRange <= 49) ||
      (filterPrice === "$50+" && restaurant.priceRange >= 50)

    const statusMatch = filterStatus === "All" || restaurant.status === filterStatus;

    return cuisineMatch && neighborhoodMatch && priceMatch && statusMatch;
  });

  return (
    <div className="profile-page">
      <h2>Profile Page</h2>
      <div className="header">
        <div className="profile-elements">
          <img src={profilePic} alt={`${name}'s profile`} className="profile-pic" />
          <div className="profile-info"> {/*Styling the profile info as vertically aligned and in black text*/}
            <h2>{name}</h2>
            <p>{phoneNumber}</p>
          </div> {/*Closing the profile's written elements*/}
        </div> {/*Closing the overall profile section*/}
      </div> {/*Closing the header*/}

      <h2>Saved Restaurants</h2>

      <div className="filters">
        <label htmlFor="cuisine-filter">Filter by Cuisine:</label>
        <select id="cuisine-filter" value={filterCuisine} onChange={(e) => setFilterCuisine(e.target.value)}>
          <option value="All">All</option>
          {uniqueCuisines.map(cuisine => (
            <option key={cuisine} value={cuisine}>{cuisine}</option>
          ))}
        </select>

        <label htmlFor="neighborhood-filter">Filter by Neighborhood:</label>
        <select id="neighborhood-filter" value={filterNeighborhood} onChange={(e) => setFilterNeighborhood(e.target.value)}>
          <option value="All">All</option>
          {uniqueNeighborhoods.map(neighborhood => (
            <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
          ))}
        </select>

        <label htmlFor="price-filter">Filter by Price Range:</label>
        <select id="price-filter" value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}>
          <option value="All">All</option>
          <option value="$0-15">$0-15</option>
          <option value="$16-25">$16-25</option>
          <option value="$26-49">$26-49</option>
          <option value="$50+">$50+</option>
        </select>

        <label htmlFor="status-filter">Visiting Status:</label>
        <select id="status-filter" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Visited">Visited</option>
          <option value="Unvisited">Unvisited</option>
        </select>
      </div> {/*Closing the dropdown filters*/}

      <div className="body">
        {filteredRestaurants.length > 0 ? (filteredRestaurants.map((id) => {
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
                  <button onClick={() => handleDelete(id)}>
                    Delete
                  </button>
                </div> {/*Closing out the written elements of the restaurant stylecard */}
              </div> /*Closing the overall restaurant card*/
            );
          })
        ) : (
          <p>No restaurants saved.</p>
        )}
      </div> {/* Closing the body div */}
      <>
      {accountInfo.likedRestaurants.length > 0 ? (
          accountInfo.likedRestaurants.map((restaurant) => (
            <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <Typography variant="body2">
            You haven't liked any restaurants yet.
          </Typography>)}
      </>
    </div> /* Closing the profile-page div */
  );
};

export default ProfilePage;
