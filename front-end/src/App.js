// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage'; // Import the LoginPage
import SignupPage from './pages/SignupPage'; // Import the SignupPage
import './App.css';

const App = () => {
  const user = { name: "John Doe", profilePicture: "https://via.placeholder.com/100" };
  const isLoggedIn = !!user;

  return (
    <Router>
      <Header user={user} isLoggedIn={isLoggedIn} />
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} /> {/* Route for Login */}
          <Route path="/signup" element={<SignupPage />} /> {/* Route for Signup */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
