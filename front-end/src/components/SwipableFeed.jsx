import React, { useState, useContext, useEffect } from "react";
import SwipeableCard from "./SwipeableCard";
import RestaurantCard from "./RestaurantCard";
import { AccountInfoContext } from "../contexts/AccountInfoContext";
import "../styles/SwipeableFeed.css";
import { bulkFetchRestaurants } from "../api/Restaurant";
import { AuthContext } from "../contexts/AuthContext";
import { SwipableFeedContext } from "../contexts/SwipableFeedContext";

const SwipableFeed = () => {
  const { setFilteredRestaurants, filteredRestaurants:restaurants } = useContext(SwipableFeedContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { accountInfo, addLikedRestaurant } = useContext(AccountInfoContext);
  const { isAuthenticated } = useContext(AuthContext)
  const { setAllRestaurants } = useContext(SwipableFeedContext)

  useEffect(() => {
    setCurrentIndex(0);
  }, [restaurants]);

  useEffect(() => {
    async function fetch() {
      if (isAuthenticated) {
        const restaurants = await bulkFetchRestaurants(accountInfo.id);
        setAllRestaurants(restaurants);
        console.log(restaurants);
        setFilteredRestaurants(restaurants);
      }
    }
    fetch()
  }, [isAuthenticated]);

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
