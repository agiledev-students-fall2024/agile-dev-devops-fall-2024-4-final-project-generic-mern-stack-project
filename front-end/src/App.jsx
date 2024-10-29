import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Goal from './pages/Goal';
import Balances from './pages/Balances';
import Transactions from './pages/Transactions';
import BottomNav from './components/bottomNav';
import { Link } from 'react-router-dom';

{/*
import Charts from './pages/charts';
import MyAccount from './pages/myaccount';
import WhatIfCalculator from './pages/whatifcalculator';
*/}

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goal" element={<Goal />} />
        <Route path="/balances" element={<Balances />} />
        <Route path="/transactions" element={<Transactions />} />
        
       {/* 
        <Route path="/charts" element={<Charts />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/balances" element={<Balances />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/whatifcalculator" element={<WhatIfCalculator />} />
        */}
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;