// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Goal from './pages/Goal';
import LoginPage from './pages/loginPage';
import Registration from './pages/registration';
import RecurringPayments from './pages/RecurringPayments';
import Me from './pages/me';
import Balances from './pages/Balances';
import Charts from './pages/charts';


import Transactions from './pages/Transactions';
import BottomNav from './components/bottomNav';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); //change it back
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>

        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<Registration />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}>
            <Route path="/" element={<Home />} />
            <Route path="/goal" element={<Goal />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/recurringPayments" element={<RecurringPayments />} />
            <Route path="/me" element={<Me />} />
            <Route path="/balances" element={<Balances />} />
            <Route path="*" element={<Navigate to="/" />} />

            <Route path="/charts" element={<Charts />} />
          </Route>


        )}

      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
