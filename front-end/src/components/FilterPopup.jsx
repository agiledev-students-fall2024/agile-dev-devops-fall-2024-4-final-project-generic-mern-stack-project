import React, { useState, useContext } from "react";
import "../styles/FilterPopup.css"; // Create this CSS file for styling
import { AccountInfoContext } from "../contexts/AccountInfoContext";

/* eslint-disable no-unused-vars */

const FilterPopup = ({ open, close }) => {
  const {
    setFilteredRestaurants,
    allrestaurants,
    accountInfo,
    setFilters,
    filteredRestaurants,
  } = useContext(AccountInfoContext);
  const { filters } = accountInfo;
  const [search, setSearch] = useState("");
  const pills = [...new Set(allrestaurants.flatMap((r) => r.pills))];
  const [searchResults, setSearchResults] = useState([]);

  const handleCheckboxChange = (pill) => {
    let updatedFilters;
    if (filters.includes(pill)) {
      updatedFilters = filters.filter((p) => p !== pill);
    } else {
      updatedFilters = [...filters, pill];
    }

    setFilters(updatedFilters);
    filterRestaurants(updatedFilters, search);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    const results = allrestaurants.filter((r) =>
      r.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSearchSelect = (restaurant) => {
    setFilteredRestaurants((prevFiltered) => {
      const otherRestaurants = allrestaurants.filter(
        (r) => r.id !== restaurant.id
      );
      return [restaurant, ...otherRestaurants];
    });

    setSearch("");
    setSearchResults([]);
    setFilters([]); // Reset filters after selection
    close(); // Close the dialog
  };

  const filterRestaurants = (pills, searchQuery) => {
    const filtered = allrestaurants.filter((restaurant) => {
      const matchesPills =
        pills.length === 0 ||
        pills.every((pill) => restaurant.pills.includes(pill));
      const matchesSearch =
        !searchQuery ||
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPills && matchesSearch;
    });
    setFilteredRestaurants(filtered);
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Filter Restaurants</h2>
        <div className="dialog-content">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />
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
          <div className="checkbox-group">
            {pills.map((pill, index) => (
              <label key={index} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.includes(pill)}
                  onChange={() => handleCheckboxChange(pill)}
                />
                {pill}
              </label>
            ))}
          </div>
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
