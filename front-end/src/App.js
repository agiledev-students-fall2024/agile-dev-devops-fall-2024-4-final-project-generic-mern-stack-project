// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage'; 
import SignupPage from './pages/SignupPage'; 
import './App.css';

const App = () => {
  const user = { name: "John Doe", profilePicture: "https://via.placeholder.com/100" };
  const isLoggedIn = !!user;

  // Function to handle signup
  const handleSignup = (userData) => {
    console.log('User signed up:', userData);
    // Perform additional logic like saving the user data or calling an API
  };

  return (
    <Router>
      <Header user={user} isLoggedIn={isLoggedIn} />
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} /> {/* Ensure this line passes the function */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
