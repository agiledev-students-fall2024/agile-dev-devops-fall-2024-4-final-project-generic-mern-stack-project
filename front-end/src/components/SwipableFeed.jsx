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

const SwipableFeed = ({ filters, selectedRestaurant }) => {
  const { accountInfo } = useContext(AccountInfoContext);
  const {
    setFilteredRestaurants,
    filteredRestaurants: restaurants,
    setAllRestaurants,
  } = useContext(SwipableFeedContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch data when accountInfo, page, or filters change
  useEffect(() => {
    if (!accountInfo) return;
    fetchRestaurants(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountInfo]);

  useEffect(() => {
      setPage(1);
      fetchRestaurants(1);
      console.log('filters changed', filters);
  }, [filters]);

  const fetchRestaurants = async (pageNumber) => {
    if(pageNumber === 1){
      setAllRestaurants([]);
      setFilteredRestaurants([]);
      setHasMore(true);
    }
    if (isFetching || (!hasMore && pageNumber !== 1)) return;
      setIsFetching(true);
      try {
        const response = await bulkFetchRestaurants({
          page: pageNumber,
          limit: 20,
          neighborhood: filters.neighborhoods ? filters.neighborhoods.join(',') : '',
          cuisine: filters.cuisines ? filters.cuisines.join(',') : '',
        });
        const fetchedRestaurants = response.restaurants;
        if (fetchedRestaurants.length === 0) {
          setHasMore(false);
        } else {
          setAllRestaurants((prevRestaurants) => {
            // Filter out restaurants that are already in the array
            const newRestaurants = fetchedRestaurants.filter(
              (newRestaurant) =>
                !prevRestaurants.some(
                  (existingRestaurant) => existingRestaurant.id === newRestaurant.id
                )
            );
            return [...prevRestaurants, ...newRestaurants];
          });
       setFilteredRestaurants((prevRestaurants) => {
            // Filter out restaurants that are already in the array
            const newRestaurants = fetchedRestaurants.filter(
              (newRestaurant) =>
                !prevRestaurants.some(
                  (existingRestaurant) => existingRestaurant.id === newRestaurant.id
                )
            );
            return [...prevRestaurants, ...newRestaurants];
          });
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setIsFetching(false);
      }
    };

  // Handle inserting selected restaurant into the feed
  useEffect(() => {
    if (selectedRestaurant) {
      // Insert the selected restaurant at the top
      setCurrentIndex(0);
      setFilteredRestaurants((prevRestaurants) => [
        selectedRestaurant,
        ...prevRestaurants,
  ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRestaurant]);

  const handleSwipe = (dir) => {
    const restaurant = restaurants[currentIndex];
    if (dir === 'left') {
      dislikeRestaurant(restaurant.id);
    } else if (dir === 'right') {
      likeRestaurant(restaurant.id);
    }
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    // Fetch next page if nearing end of current data
    if (nextIndex >= restaurants.length - 1 && hasMore && !isFetching) {
      const newPage = page + 1;
      setPage(newPage);
      fetchRestaurants(newPage);
    }
  };
  console.log(restaurants)
  return (
    <div className="swipable-feed">
      {restaurants.length > 0 && currentIndex < restaurants.length ? (
        <SwipeableCard
          key={restaurants[currentIndex].id}
          onSwipeLeft={() => handleSwipe('left')}
          onSwipeRight={() => handleSwipe('right')}
        >
          <RestaurantCard restaurant={restaurants[currentIndex]} />
        </SwipeableCard>
      ) : (
        <div className="no-more-restaurants">
          {hasMore ? 'Loading more restaurants...' : 'No more restaurants'}
        </div>
      )}
    </div>
  );
};

export default SwipableFeed;
