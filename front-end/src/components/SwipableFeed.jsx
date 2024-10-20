import React, { useState, useContext, useEffect } from "react";
import SwipeableCard from "./SwipeableCard";
import RestaurantCard from "./RestaurantCard";
import { AccountInfoContext } from "../contexts/AccountInfoContext";
import "../styles/SwipeableFeed.css";

const SwipableFeed = () => {
  const { filteredRestaurants:restaurants } = useContext(AccountInfoContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addLikedRestaurant } = useContext(AccountInfoContext);

  useEffect(() => {
    setCurrentIndex(0);
  }, [restaurants]);

  const handleSwipeLeft = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Disliked restaurant:", restaurants[currentIndex]);
    } catch (error) {
      console.error("Error in mock API call:", error);
    } finally {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSwipeRight = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Liked restaurant:", restaurants[currentIndex]);
      addLikedRestaurant(restaurants[currentIndex]);
    } catch (error) {
      console.error("Error in mock API call:", error);
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