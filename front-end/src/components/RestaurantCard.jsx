import React, { useState } from 'react';
import '../styles/RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!restaurant) return <div>No Restaurant Found</div>;

  const totalImages = restaurant.images.length;

  const handleImageClick = (event) => {
    event.stopPropagation();
    const xPosition = event.nativeEvent.offsetX;
    const elementWidth = event.currentTarget.offsetWidth;
    const isLeftSide = xPosition < elementWidth / 2;

    if (isLeftSide) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? totalImages - 1 : prevIndex - 1));
    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1));
    }
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="restaurant-card">
      <div className="image-container">
        <div onClick={handleImageClick} className="clickable-image">
          <img
            src={restaurant.images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            className="restaurant-image"
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
          />
        </div>

        <div className="pagination-dots">
          {restaurant.images.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleDotClick(index);
              }}
            />
          ))}
        </div>
      </div>

      <div className="overlay-content">
        <h5 className="restaurant-name" onClick={() => window.open(restaurant.link, '_blank')}>
          {restaurant.name}
        </h5>
        <div className="pills-container">
        {restaurant.cuisine && 
         <span className="pill">
         {restaurant.cuisine}
       </span>
        }
            <span className="pill">
              {restaurant.neighborhood}
            </span>
        </div>
        <p className="description">{restaurant.description}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
