import React, { useState, useContext, useEffect } from "react";
import "../styles/FilterPopup.css"; // Create this CSS file for styling
import { SwipableFeedContext } from "../contexts/SwipableFeedContext";

/* eslint-disable no-unused-vars */

const FilterPopup = ({ open, close, onSelectRestaurant }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearch(value);

    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchRestaurants(value);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for restaurants:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSelect = async (restaurant) => {
    try {
      // const detailedRestaurant = await fetchRestaurant(restaurant.id);
      onSelectRestaurant(restaurant);
      setSearch('');
      setSearchResults([]);
      close();
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  };

  const handleOverlayClick = () => {
    setSearch('');
    setSearchResults([]);
    close();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Search Restaurants</h2>
        <div className="dialog-content">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />
          {isSearching && <div className="loading">Searching...</div>}
          {searchResults.length > 0 && (
            <ul className="search-results">
              {searchResults.map((restaurant, index) => (
                <li
                  key={index}
                  onClick={() => handleSearchSelect(restaurant)}
                  className="search-result-item"
                >
                  {restaurant.name}
                </li>
              ))}
            </ul>
          )}
          {searchResults.length === 0 && search && !isSearching && (
            <div className="no-results">No restaurants found.</div>
          )}
        </div>
        <div className="dialog-actions">
          <button onClick={close} className="close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
