import React from 'react';
import '../assets/styles/Feedback.css';

const FeedbackForm = () => {
  return (
    <div className="feedback-form-container">
      <h2>Feedback</h2>
      <form>
        <div className="form-group">
          <label>Question 1</label>
          <input type="text" placeholder="Your response" />
        </div>
        <div className="form-group">
          <label>Question 2</label>
          <input type="text" placeholder="Your response" />
        </div>
    
        <div className="form-group">
          <label>Other</label>
          <textarea placeholder="Additional feedback"></textarea>
        </div>
        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
