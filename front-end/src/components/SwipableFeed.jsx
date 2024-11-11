// src/components/SwipableFeed.jsx

import React, { useState, useEffect, useContext } from 'react';
import SwipeableCard from './SwipeableCard';
import RestaurantCard from './RestaurantCard';
import '../styles/SwipeableFeed.css';
import {
  bulkFetchRestaurants,
  likeRestaurant,
  dislikeRestaurant,
} from '../api/Restaurant';
import { SwipableFeedContext } from '../contexts/SwipableFeedContext';
import { AccountInfoContext } from '../contexts/AccountInfoContext';

const SwipableFeed = ({ selectedRestaurant }) => {
  const { accountInfo } = useContext(AccountInfoContext);
  const {
    setFilteredRestaurants,
    filteredRestaurants: restaurants,
    setAllRestaurants,
    allRestaurants,
  } = useContext(SwipableFeedContext);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!hasMore) return;
      setIsLoading(true);
      try {
        const fetchedRestaurants = await bulkFetchRestaurants(accountInfo?.id, page);
        if (fetchedRestaurants.length === 0) {
          setHasMore(false);
        } else {
          setAllRestaurants((prevRestaurants) => [
            ...prevRestaurants,
            ...fetchedRestaurants,
          ]);
          setFilteredRestaurants((prevRestaurants) => [
            ...prevRestaurants,
            ...fetchedRestaurants,
          ]);
          setCurrentIndex((prevIndex) =>
            prevIndex + fetchedRestaurants.length
          );
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!accountInfo) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountInfo, page]);

  // Handle inserting selected restaurant into the feed
  useEffect(() => {
    if (selectedRestaurant) {
      // Insert the selected restaurant at the current position
      setFilteredRestaurants((prevRestaurants) => {
        const newRestaurants = [...prevRestaurants];
        newRestaurants.splice(currentIndex + 1, 0, selectedRestaurant);
        return newRestaurants;
      });
      // Increase currentIndex to point to the new restaurant
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRestaurant]);

  const handleSwipe = (dir, index) => {
    const restaurant = restaurants[index];
    if (dir === 'left') {
      dislikeRestaurant(restaurant.id);
    } else if (dir === 'right') {
      likeRestaurant(restaurant.id);
    }
    setCurrentIndex(index - 1);

    if (index - 1 < 5 && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="swipable-feed">
      {restaurants.map(
        (restaurant, index) =>
          index <= currentIndex && (
            <SwipeableCard
              key={restaurant.id}
              index={index}
              currentIndex={currentIndex}
              onSwipeLeft={() => handleSwipe('left', index)}
              onSwipeRight={() => handleSwipe('right', index)}
            >
              <RestaurantCard restaurant={restaurant} />
            </SwipeableCard>
          )
      )}
      {isLoading && (
        <div className="loading">Loading more restaurants...</div>
      )}
      {!hasMore && currentIndex < 0 && (
        <div className="no-more-restaurants">No more restaurants</div>
      )}
    </div>
  );
};

export default SwipableFeed;
