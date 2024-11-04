/*eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import '../styles/RestaurantListItem.css';

const RestaurantListItem = ({ restaurant, onDelete }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [status, setStatus] = useState(restaurant.status || "Want to Visit");
  
  if (!restaurant) return <div>No Restaurant Found</div>;

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure that you want to delete this restaurant?"
    );
    if(confirmed) {
      onDelete(restaurant);
    }
  };

  const handleStatus = () => {
    setPopupVisible(true);
  };

  const selectStatus = (newStatus) => {
    setStatus(newStatus);
    setPopupVisible(false);
  };


  return (
    <div className="restaurant-list-item">
      <h2 className="restaurant-name">{restaurant.name}</h2>
      <div className="pills-container">
        {restaurant.pills.map((pill, index) => (
          <span key={index} className="pill">
            {pill}
          </span>
        ))}
        <span className="pill">
          {status}
        </span>
      </div>
      <div className="button-container">
        <button className="delete-button" onClick={handleDelete}>Delete</button>
        <button className="status-button" onClick={handleStatus}>Change Status</button>
      </div>
      {popupVisible && (
        <div className="popup-screen">
          <div className="popup">
            <h3>Select Visiting Status</h3>
            <button onClick={() => selectStatus('Want to Visit')}>Want to Visit</button>
            <button onClick={() => selectStatus('Previously Visited')}>Previously Visited</button>
            <button onClick={() => setPopupVisible(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantListItem;
