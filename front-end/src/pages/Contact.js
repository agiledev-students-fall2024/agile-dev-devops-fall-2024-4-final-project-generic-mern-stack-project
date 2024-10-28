import React, { useState } from 'react';
import logo from '../assets/images/dreamer-1-Alternate.png';

const Contact = (props) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending an email 
    console.log('Form submitted:', formData);
    alert('Your message has been sent successfully!');
    setFormData({ name: '', email: '', message: '' }); // Clear form fields after submission
  };

  return (
    <div className="contact-page">
      <header className="header">
        <img src={logo} alt="Logo" className="Altlogo" />
        <nav className="navigation">
         
        </nav>
      </header>

      <h1>Contact Us</h1>
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
        </div>

        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
