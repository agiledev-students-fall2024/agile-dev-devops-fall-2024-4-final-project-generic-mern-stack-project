/*eslint-disable no-unused-vars*/
import React, { useState, useEffect, useContext } from 'react';
import '../styles/Profile.css';
import { AccountInfoContext } from '../contexts/AccountInfoContext';
import RestaurantListItem from './RestaurantListItem';
import { User } from '../api/User';

const Settings = () => {
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(0);
  const [error, setError] = useState(null);
  const { accountInfo, setAccountInfo } = useContext(AccountInfoContext);



  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleSliderChange = (event) => {
    setRadius(event.target.value);
  };



}

