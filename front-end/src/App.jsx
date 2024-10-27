import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Goal from './pages/Goal';
import { Link } from 'react-router-dom';

{/*
import Charts from './pages/charts';
import Goals from './pages/goals';
import Balances from './pages/balances';
import MyAccount from './pages/myaccount';
import WhatIfCalculator from './pages/whatifcalculator';
*/}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/goal">Goal</Link> | 
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
