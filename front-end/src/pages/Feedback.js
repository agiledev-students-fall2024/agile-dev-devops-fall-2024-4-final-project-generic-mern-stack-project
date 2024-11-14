import React, { useState } from 'react';
import logo from '../assets/images/dreamer-1-Alternate.png';
import '../assets/styles/About.css'; // Used for back button formatting
import '../assets/styles/Feedback.css';


const FeedbackForm = (props) => {
  const [formData, setFormData] = useState({ answer1: '', answer2: '', answer3: '' });

  const [feedbackSent, setFeedbackSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // Updated handleSubmit for Backend

  const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("") // reset error message


        try{
          const response = await fetch("http://localhost:5001/feedback", {

            method: "POST",

            headers:{
              "Content-Type" : "application/json",
            },

            body: JSON.stringify(formData),
          } )


          if (response.ok){
            setFeedbackSent(true); // Update State of Feedback after successful
            const resData = await response.json();
            setFormData({ answer1: '', answer2: '', answer3: '' }); // Clear Form
            setErrorMessage(''); // Clear Error message
            // alert("Feedback Sent Successfully") 
          }

          else{
            const errData = await response.json()
            setErrorMessage("Error: ${errData.message}")
            // alert("Error: ${errData.message}")// Kept for testing

          }
        }catch(error){

          console.error("Error Submitting Feedback: ", error)
          setErrorMessage("Error occured while submitting feedback. Please try again later.")
          // alert("Error occured while submitting feedback") // Kept for tesing

        }

  }


  return (

    <div className="feedback-form-container">
      <header className="header">
        <img src={logo} alt="Logo" className="Altlogo" />
      </header>


      <h1>Feedback</h1>

      { errorMessage && (
        <div className="error-message-container">
          <p className = "error-message">{errorMessage}</p>
        </div>
      )}


      {feedbackSent ? ( // Page after successful feedback

        <div className="submit-success-message">
        <p>Thank you for your feedback!</p>
        </div>


      ): ( // Page during feedback


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


      )}






      <button type="button" className="back-btn" onClick={() => window.location.href='/about'}>Back</button>

    </div>
  );

  
};

export default FeedbackForm;
