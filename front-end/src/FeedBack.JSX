// App.js
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa'; // Importing star icons from react-icons

const RestaurantReview = ({ restaurant }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating && comment) {
      const newReview = {
        rating,
        comment,
        date: new Date().toLocaleDateString(),
      };
      setReviews([...reviews, newReview]);
      setRating(null);
      setComment('');
    } else {
      alert('Please provide a rating and a comment.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <img src={restaurant.image} alt={restaurant.name} style={{ width: '200px', borderRadius: '10px' }} />
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <h4>Rate this restaurant:</h4>
          {/* Star Rating */}
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;

            return (
              <label key={index}>
                <input
                  type="radio"
                  style={{ display: 'none' }}
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  size={30}
                  color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: 'pointer' }}
                />
              </label>
            );
          })}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <textarea
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px' }}
            rows="4"
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Submit Review
        </button>
      </form>

      {/* Display Submitted Reviews */}
      <div style={{ marginTop: '30px' }}>
        <h3>Reviews:</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
              <div>
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} size={20} color="#ffc107" />
                ))}
              </div>
              <p>{review.comment}</p>
              <p style={{ fontSize: '12px', color: '#777' }}>Reviewed on {review.date}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave one!</p>
        )}
      </div>
    </div>
  );
};

// Dummy restaurant data for the component
const restaurantData = {
  name: 'La Bella Italia',
  description: 'A cozy Italian restaurant with a classic menu of delicious pasta, pizza, and wine.',
  image: 'https://via.placeholder.com/200', // Placeholder image
};

const App = () => {
  return (
    <div className="App">
      <RestaurantReview restaurant={restaurantData} />
    </div>
  );
};

export default App;
