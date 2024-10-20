import React, { useState, useContext } from "react";
import {
  Checkbox,
  Button,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { AccountInfoContext } from "../contexts/AccountInfoContext";
const FilterPopup = ({ open, close }) => {
  const { setFilteredRestaurants, allrestaurants, accountInfo, setFilters, filteredRestaurants } = useContext(AccountInfoContext);
  const { filters } = accountInfo;
  const [search, setSearch] = useState("");
  const pills = [...new Set(allrestaurants.flatMap((r) => r.pills))];
  const [searchResults, setSearchResults] = useState([]);

  const handleCheckboxChange = (pill) => {
    let updatedFilters;
    if (filters.includes(pill)) {
      // If pill is already selected, remove it
      updatedFilters = filters.filter((p) => p !== pill);
    } else {
      // Otherwise, add it to the filters
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
      const otherRestaurants = allrestaurants.filter(r => r.id !== restaurant.id);
      return [restaurant, ...otherRestaurants];
    });
    
    setSearch("");  
    setSearchResults([]);
    setFilters([]); // Reset filters after selection
    close(); // Close the dialog
  };

  const filterRestaurants = (pills, searchQuery) => {
    const filtered = allrestaurants.filter((restaurant) => {
      const matchesPills = pills.length === 0 || pills.every((pill) => restaurant.pills.includes(pill));
      const matchesSearch = !searchQuery || restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPills && matchesSearch;
    });
    setFilteredRestaurants(filtered);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Filter Restaurants</DialogTitle>
      <DialogContent>
        <TextField
          label="Search"
          value={search}
          onChange={handleSearchChange}
          fullWidth
        />
        {searchResults.length > 0 &&
          searchResults.map((restaurant, index) => (
            <MenuItem key={index} onClick={() => handleSearchSelect(restaurant)}>
              {restaurant.name}
            </MenuItem>
          ))}
        {pills.map((pill, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={filters.includes(pill)}
                onChange={() => handleCheckboxChange(pill)}
              />
            }
            label={pill}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterPopup;
