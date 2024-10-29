import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Goal from './pages/Goal';
import LoginPage from './pages/loginPage';
import Registration from './pages/registration';
import RecurringPayments from './pages/RecurringPayments';
import Me from './pages/me';
import Balances from './pages/Balances';


import Transactions from './pages/Transactions';
import BottomNav from './components/bottomNav';
import SideNavBar from './components/sideNavBar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {location.pathname !== '/transactions' && (
        <SideNavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
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
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/recurringPayments" element={<RecurringPayments />} />
            <Route path="/me" element={<Me />} />
            <Route path="/balances" element={<Balances />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

      </Routes>
      <BottomNav />
    </>
  );
}

export default App;
