import React, { useState } from 'react';
import logo from '../assets/images/dreamer-1-Alternate.png';
import '../assets/styles/About.css'; // Used for back button formatting
import '../assets/styles/Feedback.css';


const FeedbackForm = (props) => {
  const [formData, setFormData] = useState({ answer1: '', answer2: '', answer3: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending an email 
    console.log('Form submitted:', formData);
    alert('Your Feedback has been sent successfully!');
    setFormData({ answer1: '', answer2: '', answer3: '' }); // Clear form fields after submission
  };

  return (
    <div className="feedback-form-container">
      <header className="header">
        <img src={logo} alt="Logo" className="Altlogo" />
      </header>


      <h1>Feedback</h1>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="answer1">Question 1</label>
          <textarea
            type="message"
            id="answer1"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
            placeholder='Your Response'
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="answer2">Question 2</label>
          <textarea
            type="message"
            id="answer2"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
            placeholder='Your Response'
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="answer3">Question 3</label>
          <textarea
            type="message"
            id="answer3"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
            placeholder='Your Response'
            required
          />
        </div>

        <button type="submit" className="submit-btn">Send Feedback</button>
      </form>

      <button type="button" className="back-btn" onClick={() => window.location.href='/about'}>Back</button>

    </div>
  );
};

export default FeedbackForm;
