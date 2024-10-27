import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import { Link } from 'react-router-dom';
import Balances from './pages/Balances';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/balances" element={<Balances />} />
      </Routes>
    </Router>
  );
}

export default App;
