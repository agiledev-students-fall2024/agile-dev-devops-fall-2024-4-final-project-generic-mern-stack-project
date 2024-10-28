import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/home';
import Goal from './pages/Goal';
import LoginPage from './pages/loginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/goal">Goal</Link> | 
        {!isLoggedIn && <Link to="/login">Login</Link>}
      </nav>

      <Routes>
        {/* Route for Login */}
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/goal" element={<Goal />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
