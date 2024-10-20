import React, { useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import '../styles/RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  if(!restaurant) return <div>No Restaurant Found</div>;
  const totalImages = restaurant.imgs.length;

  const handleImageClick = (event) => {
    event.stopPropagation();
    const xPosition = event.nativeEvent.offsetX;
    const elementWidth = event.currentTarget.offsetWidth;
    const isLeftSide = xPosition < elementWidth / 2;

    if (isLeftSide) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? totalImages - 1 : prevIndex - 1
      );
    } else {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === totalImages - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };
  return (
    <Box className="restaurant-card">
      <Box className="image-container">
        <div
          onClick={handleImageClick}
          className="clickable-image"
        >
          <img
            src={restaurant.imgs[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            className="restaurant-image"
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
          />
        </div>

        <Box className="pagination-dots">
          {restaurant.imgs.map((_, index) => (
            <Box
              key={index}
              className={`dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleDotClick(index);
              }}
            />
          ))}
        </Box>
      </Box>

      <Box className="overlay-content">
        <Typography
          variant="h5"
          onClick={() => (window.location.href = restaurant.link)}
        >
          {restaurant.name}
        </Typography>
        <Box className="pills-container">
          {restaurant.pills.map((pill, index) => (
            <Chip key={index} label={pill} color="primary" />
          ))}
        </Box>
        <Typography variant="body2" className="description">
          {restaurant.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default RestaurantCard;
