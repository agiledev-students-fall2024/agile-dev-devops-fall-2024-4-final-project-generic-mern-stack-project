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
import { SelectedRestaurantContext } from '../contexts/SelectedRestaurantContext';

const SwipableFeed = () => {
  const { accountInfo } = useContext(AccountInfoContext);
  const {
    setFilteredRestaurants,
    filteredRestaurants: restaurants,
    setAllRestaurants,
  } = useContext(SwipableFeedContext);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { selectedRestaurant, setSelectedRestaurant } = useContext(SelectedRestaurantContext);

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

  const clearSelectedRestaurant = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div className="swipable-feed">
      {selectedRestaurant ? (
        <div className="selected-restaurant">
          <button className="back-button" onClick={clearSelectedRestaurant}>
            ← Back to Feed
          </button>
          <RestaurantCard restaurant={selectedRestaurant} />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default SwipableFeed;
