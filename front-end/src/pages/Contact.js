import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS SDK for sending emails
//import '../assets/styles/Contact.css';
import '../assets/styles/About.css';
import '../assets/styles/Feedback.css';



const ContactForm = () => {
  // Form state: Captures the user's name, email, and message
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userMessage: '',
  });

  // State to track whether the message has been successfully sent
  const [messageSent, setMessageSent] = useState(false);

  // State to handle any potential error messages during form submission
  const [errorMessage, setErrorMessage] = useState('');

  // Function to update form state when user interacts with input fields
  const handleChange = (event) => {
    const target = event.target; // Get the target input element
    const name = target.name; // Get the name of the field
    const value = target.value; // Get the value of the field

    // Use previous state to update the specific field without affecting others
    setFormData((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: value,
      };
      return updatedState; // Return the updated state
    });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setErrorMessage(''); // Reset error message on new submission

    // Validate form data before proceeding
    const isValid = validateFormData(formData);
    if (!isValid) {
      setErrorMessage('Please fill out all required fields correctly.');
      return;
    }

    try {
      // Define constants for EmailJS service, template, and user credentials
      const serviceID = 'service_u58tn8n'; // EmailJS Service ID
      const templateID = 'template_kkbfnue'; // EmailJS Template ID
      const userID = 'k_OkNdBx5fQ7bpD2S'; // EmailJS User ID

      // Create an object to map form data to email template parameters
      const templateParams = {
        userName: formData.userName || 'Anonymous', // Default to Anonymous if no name is provided
        userEmail: formData.userEmail || 'No email provided', // Handle missing email gracefully
        userMessage: formData.userMessage || 'No message provided.', // Default message if empty
      };

      // Use EmailJS to send the email
      await emailjs.send(serviceID, templateID, templateParams, userID);

      // If successful, update the messageSent state and reset the form
      setMessageSent(true);
      resetFormState();

    } catch (error) {
      console.error('Error Sending Message:', error);

      // Update the errorMessage state if the email fails to send
      setErrorMessage(
        'There was an issue sending your message. Please try again later.'
      );
    }
  };

  // Helper function to validate form data
  const validateFormData = (data) => {
    const { userName, userEmail, userMessage } = data;

    // Simple validation logic to ensure all fields are filled
    if (!userName || !userEmail || !userMessage) {
      return false; // Invalid if any field is empty
    }

    // Additional validation for email format
    if (!isValidEmail(userEmail)) {
      return false; // Invalid if email format is incorrect
    }

    return true; // All fields are valid
  };

  // Helper function to check if an email address is valid
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email); // Return true if email matches regex
  };

  // Helper function to reset the form state
  const resetFormState = () => {
    setFormData({
      userName: '',
      userEmail: '',
      userMessage: '',
    });
  };

  return (
    <div className="contact-form-container">
      <h1>Contact Us</h1>

      {/* Display error message if one exists */}
      {errorMessage && (
        <div className="error-message-container">
          <p className="error-message">{errorMessage}</p>
        </div>
      )}

      {/* Show success message if the form has been submitted successfully */}
      {messageSent ? (
        <div className="submit-success-message">
          <p>
            Thank you for reaching out! Your message has been successfully sent,
            and we will get back to you as soon as possible.
          </p>
          <button
            type="button"
            className="reset-btn"
            onClick={() => setMessageSent(false)}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="userEmail">Your Email</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label htmlFor="userMessage">Your Message</label>
            <textarea
              id="userMessage"
              name="userMessage"
              value={formData.userMessage}
              onChange={handleChange}
              placeholder="Enter your message here"
              rows="5"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            aria-label="Submit Contact Form"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
