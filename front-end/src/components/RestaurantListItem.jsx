import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import '../styles/RestaurantListItem.css';

const RestaurantListItem = ({ restaurant }) => {
  if (!restaurant) return <div>No Restaurant Found</div>;

  return (
    <Box className="restaurant-list-item">
      <Typography variant="h6" className="restaurant-name">
        {restaurant.name}
      </Typography>
      <Box className="pills-container">
        {restaurant.pills.map((pill, index) => (
          <Chip key={index} label={pill} color="primary" size="small" />
        ))}
      </Box>
    </Box>
  );
};

export default RestaurantListItem;
