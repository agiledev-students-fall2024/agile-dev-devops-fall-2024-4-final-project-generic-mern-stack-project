import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Home from './pages/home';
import Goal from './pages/Goal';
import LoginPage from './pages/loginPage';
import Registration from './pages/registration';
import RecurringPayments from './pages/RecurringPayments';
import Me from './pages/me';
import Balances from './pages/Balances';
import Transactions from './pages/Transactions';
import BottomNav from './components/bottomNav';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const handleLogin = (token) => {
    localStorage.setItem('token', token); // Save token in local storage
    setAuthToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    setAuthToken(null);
  };

  return (
    <Router>
      <AppContent
        authToken={authToken}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    </Router>
  );
}

function AppContent({ authToken, handleLogin, handleLogout }) {
  const location = useLocation();

  return (
    <>
      {/* Removed global header */}
      <Routes>
        {!authToken ? (
          <>
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route path="/register" element={<Registration />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route
              element={
                <ProtectedRoute
                  isLoggedIn={!!authToken}
                  handleLogout={handleLogout}
                />
              }
            >
              <Route path="/" element={<Home onLogout={handleLogout} />} />
              <Route path="/goal" element={<Goal />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route
                path="/recurringPayments"
                element={<RecurringPayments />}
              />
              <Route path="/me" element={<Me />} />
              <Route path="/balances" element={<Balances />} />
              {/* Removed the /charts route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </>
        )}
      </Routes>
      {authToken && location.pathname !== '/login' && <BottomNav />}
      {/* Show bottom nav when logged in */}
    </>
  );
}

export default App;
