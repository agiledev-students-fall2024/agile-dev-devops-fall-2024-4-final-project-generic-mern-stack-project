import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi'; // Importing hamburger icon
import Home from './pages/home';
import Goal from './pages/Goal';
import LoginPage from './pages/loginPage';
import Registration from './pages/registration';
import Me from './pages/me';
import './App.css';
import Balances from './pages/Balances';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); //change it back
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle successful login
  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsMenuOpen(false); // Close menu on login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false); // Close menu on logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      {isLoggedIn && (
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <FiMenu size={30} onClick={toggleMenu} style={{ cursor: 'pointer', color: 'black' }} />
        </div>
      )}

      {isLoggedIn && isMenuOpen && (
        <div className="hamburger-dropdown">
          <nav>
            {/* Change "Me" to "My Account" in the Link */}
            <Link to="/me" onClick={toggleMenu}>My Account</Link>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        </div>
      )}

      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<Registration />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/goal" element={<Goal />} />
            <Route path="/me" element={<Me />} /> {/* Path remains /me */}
            <Route path="/balances" element={<Balances />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
