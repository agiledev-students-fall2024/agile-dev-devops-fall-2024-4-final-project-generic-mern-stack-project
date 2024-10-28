// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfileDropdown from './components/profile/ProfileDropdown';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import AuthContext
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
};

// Separate Main component for better organization
const Main = () => {
  const { isLoggedIn, logout } = useAuth(); // Consume the context
  const user = isLoggedIn ? { name: "J Doe", profilePicture: "https://via.placeholder.com/100" } : null;

  const handleSignUp = () => {
    console.log('User signed up');
    // Login logic if needed
  };

  return (
    <>
      <Header user={user} isLoggedIn={isLoggedIn} />
      <main className="App-main">
        <ProfileDropdown onSignOut={logout} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage onSignUp={handleSignUp} />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
