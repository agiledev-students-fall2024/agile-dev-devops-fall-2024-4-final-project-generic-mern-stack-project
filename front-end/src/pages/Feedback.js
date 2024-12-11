import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS SDK
import logo from '../assets/images/dreamer-1-Alternate.png';
import '../assets/styles/About.css';
import '../assets/styles/Feedback.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    answer1: '',
    answer2: '',
    answer3: '',
    additionalInfo: '',
  });

  const [feedbackSent, setFeedbackSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [remainingChars, setRemainingChars] = useState({
    answer1: 200,
    answer2: 200,
    answer3: 300,
    additionalInfo: 500,
  });

  // Define character limits for each field to ensure they match requirements
  const charLimits = {
    answer1: 200,
    answer2: 200,
    answer3: 300,
    additionalInfo: 500,
  };

  // Function to handle changes in form inputs and manage state updates
  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    if (inputName in charLimits) {
      // Check if the value's length exceeds the defined limit
      if (inputValue.length <= charLimits[inputName]) {
        setFormData((prevState) => {
          return {
            ...prevState,
            [inputName]: inputValue,
          };
        });

        setRemainingChars((prevRemainingChars) => {
          return {
            ...prevRemainingChars,
            [inputName]: charLimits[inputName] - inputValue.length,
          };
        });
      }
    } else {
      setFormData((prevState) => {
        return {
          ...prevState,
          [inputName]: inputValue,
        };
      });
    }
  };

  // Function to handle form submission and send the email
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage(''); // Clear any existing error messages

    try {
      // Define EmailJS configuration details
      const serviceID = 'service_u58tn8n'; // Your EmailJS Service ID
      const templateID = 'template_jt3gx9m'; // Your EmailJS Template ID
      const userID = 'k_OkNdBx5fQ7bpD2S'; // Your EmailJS User ID

      // Template parameters for EmailJS
      const templateParams = {
        to_email: 'gr2257@nyu.edu', // Send to this email
        answer1: formData.answer1, // Answer 1
        answer2: formData.answer2, // Answer 2
        answer3: formData.answer3, // Answer 3
        additionalInfo: formData.additionalInfo || 'No additional information provided.',
      };

      // Send email through EmailJS
      await emailjs.send(serviceID, templateID, templateParams, userID);

      // If successful, update feedbackSent and reset form
      setFeedbackSent(true);

      setFormData({
        answer1: '',
        answer2: '',
        answer3: '',
        additionalInfo: '',
      });

      setRemainingChars({
        answer1: charLimits.answer1,
        answer2: charLimits.answer2,
        answer3: charLimits.answer3,
        additionalInfo: charLimits.additionalInfo,
      });

      setErrorMessage(''); // Clear any error messages upon success
    } catch (error) {
      console.error('Error Sending Email:', error);

      setErrorMessage(
        'We encountered an issue while sending your feedback. Please try again later.'
      );
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
          <p>Thank you for your feedback! We greatly appreciate your time and effort in helping us improve.</p>
          <button
            type="button"
            className="reset-btn"
            onClick={() => setFeedbackSent(false)}
          >
            Submit More Feedback
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="answer1">How did you hear about this app?</label>
            <textarea
              id="answer1"
              name="answer1"
              value={formData.answer1}
              onChange={handleChange}
              maxLength={200}
              required
            />
            <p className="char-counter">{remainingChars.answer1} characters left</p>
          </div>

          <div className="form-group">
            <label htmlFor="answer2">What did you like about the app?</label>
            <textarea
              id="answer2"
              name="answer2"
              value={formData.answer2}
              onChange={handleChange}
              maxLength={200}
              required
            />
            <p className="char-counter">{remainingChars.answer2} characters left</p>
          </div>

          <div className="form-group">
            <label htmlFor="answer3">What could we improve?</label>
            <textarea
              id="answer3"
              name="answer3"
              value={formData.answer3}
              onChange={handleChange}
              maxLength={300}
              required
            />
            <p className="char-counter">{remainingChars.answer3} characters left</p>
          </div>

          <div className="form-group">
            <label htmlFor="additionalInfo">Additional Information (Optional)</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              maxLength={500}
            />
            <p className="char-counter">
              {remainingChars.additionalInfo} characters left
            </p>
          </div>

          <button
            type="submit"
            className="submit-btn"
            aria-label="Submit Feedback Button"
          >
            Send Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
