import React, { useState, useContext } from 'react';
import '../styles/FilterPopup.css';
import { SwipableFeedContext } from '../contexts/SwipableFeedContext';
import { searchRestaurants } from '../api/Restaurant';

const FilterPopup = ({ open, close }) => {
  const { setFilteredRestaurants, filters, setFilters, allRestaurants } = useContext(SwipableFeedContext);
  const [search, setSearch] = useState('');
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

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearch(value);

    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchRestaurants(value);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for restaurants:', error);
    }
  };

  const handleSearchSelect = (restaurant) => {
    setFilteredRestaurants([restaurant]);
    setSearch('');
    setSearchResults([]);
    setFilters([]);
    close();
  };

  const filterRestaurants = (pills, searchQuery) => {
    const filtered = allRestaurants.filter((restaurant) => {
      const matchesPills = pills.length === 0 || pills.every((pill) => restaurant.pills.includes(pill));
      const matchesSearch = !searchQuery || restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPills && matchesSearch;
    });
    setFilteredRestaurants(filtered);
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={() => {
      setSearch('');
      setSearchResults([]);
      setFilters([]);
      close();
    }}>
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
          {/* Checkbox filters can be implemented as needed */}
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
