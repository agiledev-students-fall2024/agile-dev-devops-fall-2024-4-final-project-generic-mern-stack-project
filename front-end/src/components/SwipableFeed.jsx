import React, { useState } from 'react';
import SwipeableCard from './SwipeableCard';
import RestaurantCard from './RestaurantCard';
import '../styles/SwipeableFeed.css';

const SwipableFeed = ({ restaurants }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    // TODO -- Handle dislike action
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSwipeRight = () => {
    // TODO -- Handle like action
    setCurrentIndex((prev) => prev + 1);
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
