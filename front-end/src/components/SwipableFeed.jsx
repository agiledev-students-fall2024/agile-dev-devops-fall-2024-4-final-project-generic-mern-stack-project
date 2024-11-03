import React, { useState, useEffect, useContext } from 'react';
import SwipeableCard from './SwipeableCard';
import RestaurantCard from './RestaurantCard';
import '../styles/SwipeableFeed.css';
import { bulkFetchRestaurants, likeRestaurant, dislikeRestaurant } from '../api/Restaurant';
import { SwipableFeedContext } from '../contexts/SwipableFeedContext';
import { AccountInfoContext } from '../contexts/AccountInfoContext';

const SwipableFeed = () => {
  const { accountInfo } = useContext(AccountInfoContext);
  const { setFilteredRestaurants, filteredRestaurants: restaurants, setAllRestaurants } = useContext(SwipableFeedContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [restaurants]);

  useEffect(() => {
    async function fetchData() {
      console.log('Fetching restaurants for user:', accountInfo?.id);
      const fetchedRestaurants = await bulkFetchRestaurants(accountInfo?.id);
      setAllRestaurants(fetchedRestaurants);
      setFilteredRestaurants(fetchedRestaurants);
    }
    if(!accountInfo) return;
    fetchData();
  }, [accountInfo]);

  const handleSwipeLeft = async () => {
    try {
      const restaurant = restaurants[currentIndex];
      await dislikeRestaurant(restaurant.id);
      console.log('Disliked restaurant:', restaurant);
    } catch (error) {
      console.error('Error in dislike API call:', error);
    } finally {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSwipeRight = async () => {
    try {
      const restaurant = restaurants[currentIndex];
      await likeRestaurant(restaurant.id);
      console.log('Liked restaurant:', restaurant);
      // Optionally, you can add the restaurant to a liked list in your context
    } catch (error) {
      console.error('Error in like API call:', error);
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
      <SwipeableCard onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} key={currentIndex}>
        <RestaurantCard restaurant={currentRestaurant} />
      </SwipeableCard>
    </div>
  );
};

export default SwipableFeed;
