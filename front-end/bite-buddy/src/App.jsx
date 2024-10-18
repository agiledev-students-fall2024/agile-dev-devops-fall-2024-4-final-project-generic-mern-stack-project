import { useState } from 'react'
import Footer from './components/Footer.jsx'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Record from './pages/Record';
import Challenges from './pages/Challenges';
import Profile from './pages/Profile';
import Signup from './pages/Signup'
import Login from './pages/Login';

function App() {
    const location = useLocation();
      return(
        
        <>
        {location.pathname !== "/signup" && location.pathname !== "/login" && <Footer />}

        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/record" element={<Record />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />} />
        </Routes>

          </>
      );
  }

export default App
