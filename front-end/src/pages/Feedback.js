import React, { useState, useEffect } from 'react';
import logo from '../assets/images/dreamer-1-Alternate.png';
import '../assets/styles/About.css';
import '../assets/styles/Feedback.css';

const FeedbackForm = (props) => {
  const [formData, setFormData] = useState({
    answer1: '',
    answer2: '',
    answer3: '',
    additionalInfo: '',
  });
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [remainingChars, setRemainingChars] = useState({
    answer1: 200,
    answer2: 200,
    answer3: 300,
    additionalInfo: 500,
  });

  const charLimits = {
    answer1: 200,
    answer2: 200,
    answer3: 300,
    additionalInfo: 500,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure the character count updates correctly even with backspace
    if (value.length <= charLimits[name]) {
      setFormData({ ...formData, [name]: value });
      setRemainingChars({ ...remainingChars, [name]: charLimits[name] - value.length });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setFieldErrors({});

    try {
      const response = await fetch('http://localhost:5001/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFeedbackSent(true);
        setFormData({ answer1: '', answer2: '', answer3: '', additionalInfo: '' });
        setRemainingChars({ answer1: 200, answer2: 200, answer3: 300, additionalInfo: 500 });
        setErrorMessage('');
      } else {
        const errData = await response.json();

        if (errData.errors) {
          const errors = {};
          errData.errors.forEach((err) => {
            errors[err.param] = err.msg;
          });
          setFieldErrors(errors);
        } else {
          setErrorMessage(`Error: ${errData.message}`);
        }
      }
    } catch (error) {
      console.error('Error Submitting Feedback: ', error);
      setErrorMessage('Error occurred while submitting feedback. Please try again later.');
    }
  };

  return (
    <div className="feedback-form-container">
      <header className="header">
        <img src={logo} alt="Logo" className="Altlogo" />
      </header>

      <h1>Feedback</h1>

      {errorMessage && (
        <div className="error-message-container">
          <p className="error-message">{errorMessage}</p>
        </div>
      )}

      {feedbackSent ? (
        <div className="submit-success-message">
          <p>Thank you for your feedback!</p>
          <button
            type="button"
            className="reset-btn"
            onClick={() => {
              setFeedbackSent(false);
            }}
          >
            Submit More Feedback
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="answer1">How did you hear about this app? </label>
            <textarea
              id="answer1"
              name="answer1"
              value={formData.answer1}
              onChange={handleChange}
              placeholder="Your Response"
              maxLength={200}
              required
            />
            {fieldErrors.answer1 && <p className="error-message">{fieldErrors.answer1}</p>}
            {remainingChars.answer1 !== undefined && (
              <p className="char-counter">{remainingChars.answer1} characters left</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="answer2">If there's one thing you like about the app, what was it?  </label>
            <textarea
              id="answer2"
              name="answer2"
              value={formData.answer2}
              onChange={handleChange}
              placeholder="Your Response"
              maxLength={200}
              required
            />
            {fieldErrors.answer2 && <p className="error-message">{fieldErrors.answer2}</p>}
            {remainingChars.answer2 !== undefined && (
              <p className="char-counter">{remainingChars.answer2} characters left</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="answer3">If there is one thing you want this app to improve on, what would it be?

            </label>
            <textarea
              id="answer3"
              name="answer3"
              value={formData.answer3}
              onChange={handleChange}
              placeholder="Your Response"
              maxLength={300}
              required
            />
            {fieldErrors.answer3 && <p className="error-message">{fieldErrors.answer3}</p>}
            {remainingChars.answer3 !== undefined && (
              <p className="char-counter">{remainingChars.answer3} characters left</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="additionalInfo">Additional Information (Optional)</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Any other feedback you'd like to provide"
              maxLength={500}
            />
            {fieldErrors.additionalInfo && (
              <p className="error-message">{fieldErrors.additionalInfo}</p>
            )}
            {remainingChars.additionalInfo !== undefined && (
              <p className="char-counter">{remainingChars.additionalInfo} characters left</p>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Send Feedback
          </button>
        </form>
      )}

      <button
        type="button"
        className="back-btn"
        onClick={() => (window.location.href = '/about')}
      >
        Back
      </button>
    </div>
  );
};

export default FeedbackForm;
