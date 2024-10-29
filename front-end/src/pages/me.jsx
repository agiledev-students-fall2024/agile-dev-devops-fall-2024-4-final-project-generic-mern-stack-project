// src/pages/me.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./me.css";

function Me() {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const mockarooUrl = "https://my.api.mockaroo.com/tracker.json?key=a3c50f90";

    axios.get(mockarooUrl)
      .then((response) => {
        console.log("API Response:", response.data);

        // Option 1: Get the first user in the response
        const user = response.data[0];
        
        // Option 2: Randomly select a user
        // const user = response.data[Math.floor(Math.random() * response.data.length)];

        if (user) {
          setUserData(user);
        } else {
          setErrorMessage("No user data available.");
        }
      })
      .catch((error) => {
        console.error("Error fetching mock data:", error);
        setErrorMessage("Unable to load user data.");
      });
  }, []);

  if (errorMessage) {
    return <p className="error">{errorMessage}</p>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  // Mask the password with asterisks
  const maskedPassword = "*".repeat(userData.password.length);

  return (
    <div className="me-container">
      <h2>My Account</h2>
      <p><strong>First Name:</strong> {userData.first_name}</p>
      <p><strong>Last Name:</strong> {userData.last_name}</p>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Password:</strong> {maskedPassword}</p>
    </div>
  );
}

export default Me;
