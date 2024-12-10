import React, { useState } from 'react';
import logo from '../assets/images/dreamer-1-Alternate.png';
import '../assets/styles/About.css';

const Contact = (props) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({}); // For field-specific errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: '' }); // Clear the field error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setFieldErrors({}); // Reset all errors

    try {
      const response = await fetch('http://localhost:5001/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setContactSent(true); // Update state on successful submission
        setFormData({ name: '', email: '', message: '' }); // Clear form
        setErrorMessage(''); // Clear any error message
      } else {
        const errData = await response.json();

        if (errData.errors) {
          const errors = {};
          errData.errors.forEach((err) => {
            errors[err.field] = err.message; // Map field to error message
          });
          setFieldErrors(errors); // Update state with field-specific errors
        } else {
          setErrorMessage(`Error: ${errData.message}`);
        }
      }
    } catch (error) {
      console.error('Error Submitting Form: ', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="contact-page">
      <header className="header">
        <img src={logo} alt="Logo" className="Altlogo" />
        <nav className="navigation"></nav>
      </header>

      <h1>Contact Us</h1>

      {errorMessage && (
        <div className="error-message-container">
          <p className="error-message">{errorMessage}</p>
        </div>
      )}

      {contactSent ? (
        <div className="submit-success-message">
          <p>Thank you for contacting us!</p>
          <button
            type="button"
            className="reset-btn"
            onClick={() => setContactSent(false)}
          >
            Submit Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {fieldErrors.name && <p className="error-message">{fieldErrors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {fieldErrors.email && <p className="error-message">{fieldErrors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            {fieldErrors.message && <p className="error-message">{fieldErrors.message}</p>}
          </div>

          <button type="submit" className="submit-btn">
            Send Message
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

export default Contact;
