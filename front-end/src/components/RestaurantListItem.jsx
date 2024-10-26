import React from 'react';
import '../styles/RestaurantListItem.css';

const RestaurantListItem = ({ restaurant }) => {
  if (!restaurant) return <div>No Restaurant Found</div>;

  return (
    <div className="restaurant-list-item">
      <h2 className="restaurant-name">
        {restaurant.name}
      </h2>
      <div className="pills-container">
        {restaurant.pills.map((pill, index) => (
          <span key={index} className="pill">
            {pill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RestaurantListItem;
