import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Goal from './pages/Goal';
import Balances from './pages/Balances';
import { Link } from 'react-router-dom';
import charts from './pages/charts';

{/*
import Charts from './pages/charts';
import Goals from './pages/goals';
import MyAccount from './pages/myaccount';
import WhatIfCalculator from './pages/whatifcalculator';
*/}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/goal">Goals</Link> | 
        <Link to="/balances">Balances</Link> | 
        <Link to="/charts">charts</Link> |
        {/*
        <Link to="/charts">Charts</Link> | 
        <Link to="/goals">Goals</Link> | 
        <Link to="/balances">Balances</Link> | 
        <Link to="/myaccount">My Account</Link> | 
        <Link to="/whatifcalculator">What-If Calculator</Link>
        */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goal" element={<Goal />} />
        <Route path="/balances" element={<Balances />} />
        <Route path="/charts" element={<charts />} />
        
       {/* 
        <Route path="/charts" element={<Charts />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/balances" element={<Balances />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/whatifcalculator" element={<WhatIfCalculator />} />
        */}
      </Routes>
    </Router>
  );
}

export default App;