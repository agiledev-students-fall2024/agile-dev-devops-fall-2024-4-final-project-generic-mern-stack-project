import React, { useState } from 'react';
import logo from '../assets/images/dreamer-1-Alternate.png';
import '../assets/styles/About.css'; // Used for back button formatting


const Contact = (props) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("")

    try{
      const response = await fetch("http://localhost:5001/contact", {

        method: "POST",

        headers:{
          "Content-Type" : "application/json",
        },

        body: JSON.stringify(formData),
      } )


      if (response.ok){
        setContactSent(true); // Update State of contact page after successful submission
        const resData = await response.json();
        setErrorMessage(''); // Clear Error message
        // alert("Form Submitted Successfully")// Kept for testing
        setFormData({ name: '', email: '', message: '' }); // Clear form

      }

      else{
        const errData = await response.json()
        setErrorMessage("Error: ${errData.message}")
        // alert("Error: ${errData.message}")// Kept for testing

      }
    }catch(error){

      console.error("Error Submitting form: ", error)
      setErrorMessage("Error occured while submitting feedback. Please try again later.fsfsdafafadsfdasfdasdfasffads")
      // alert("Error occured while submitting feedback") // Kept for tesing

    }




  }

  return (
    <div className="contact-page">
      <header className="header">
        <img src={logo} alt="Logo" className="Altlogo" />
        <nav className="navigation">
         
        </nav>
      </header>

      <h1>Contact Us</h1>


      { errorMessage && (
        <div className="error-message-container">
          <p className = "error-message">{errorMessage}</p>
        </div>
      )}



      {contactSent ?(// Page after successful submission
          <div className="submit-success-message">
          <p>Thank you for Contacting Us!</p>
            </div>
      ):(<form onSubmit={handleSubmit} className="contact-form">
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
      </form>)}



      

      <button type="button" className="back-btn" onClick={() => window.location.href='/about'}>Back</button>

    </div>
  );
};

export default Contact;
