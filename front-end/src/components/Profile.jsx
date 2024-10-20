import React, { useContext } from 'react';
import { AccountInfoContext } from '../contexts/AccountInfoContext';
import RestaurantListItem from './RestaurantListItem';
import { Box, Typography } from '@mui/material';
import '../styles/Profile.css'; 

const ProfilePage = () => {
  const { accountInfo } = useContext(AccountInfoContext);

  return (
    <Box className="profile-page">
      <Typography variant="h4" gutterBottom>
        Profile Information
      </Typography>
      <Box className="user-info">
        <Typography variant="body1">
          <strong>Username:</strong> {accountInfo.username}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {accountInfo.email}
        </Typography>
      </Box>

      <Box className="liked-restaurants-section">
        <Typography variant="h5" gutterBottom>
          Your Liked Restaurants
        </Typography>
        {accountInfo.likedRestaurants.length > 0 ? (
          accountInfo.likedRestaurants.map((restaurant) => (
            <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <Typography variant="body2">
            You haven't liked any restaurants yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
