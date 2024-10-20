import React, { useState, useContext } from 'react';
import SwipeableCard from './SwipeableCard';
import RestaurantCard from './RestaurantCard';
import { AccountInfoContext } from '../contexts/AccountInfoContext'; // Import the context
import '../styles/SwipeableFeed.css';

const SwipableFeed = ({ restaurants }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addLikedRestaurant } = useContext(AccountInfoContext); // Access the context

  const handleSwipeLeft = async () => {
    // Mock API call for dislike action
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      console.log('Disliked restaurant:', restaurants[currentIndex]);
    } catch (error) {
      console.error('Error in mock API call:', error);
    } finally {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSwipeRight = async () => {
    // Mock API call for like action
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      console.log('Liked restaurant:', restaurants[currentIndex]);
      addLikedRestaurant(restaurants[currentIndex]); // Update the likedRestaurants in context
    } catch (error) {
      console.error('Error in mock API call:', error);
    } finally {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (currentIndex >= restaurants.length) {
    return <div>No more restaurants</div>;
  }

  const currentRestaurant = restaurants[currentIndex];
  return (
    <div className="swipable-feed">
      <SwipeableCard
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        key={currentIndex}
      >
        <RestaurantCard restaurant={currentRestaurant} />
      </SwipeableCard>
    </div>
  );
};

export default SwipableFeed;
