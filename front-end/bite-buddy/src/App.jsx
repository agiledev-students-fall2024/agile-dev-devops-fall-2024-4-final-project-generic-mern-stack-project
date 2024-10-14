import { useState } from 'react'
import Footer from './components/Footer.jsx'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Record from './pages/Record';
import Challenges from './pages/Challenges';
import Profile from './pages/Profile';

function App() {

      return(
        
        <>
        <Footer></Footer>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/record" element={<Record />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

        </>
      );
  }

export default App
