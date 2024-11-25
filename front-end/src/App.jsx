import Nav from './components/Footer.jsx';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Record from './pages/Record';
import Challenges from './pages/Challenges';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Signup_Profile from './pages/Signup_profile';
import Activity_Tracker from './pages/Activity_Tracker';
import Progress_Tracker from './pages/Progress_Tracker';
import ProtectedRoute from './protectedRoutes.jsx'; // Import the ProtectedRoute component

function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        

        {/* Protected Routes */}
        <Route path="/signup-profile" element={<ProtectedRoute element={Signup_Profile} />}  />
        <Route path="/home" element={<ProtectedRoute element={Home} />} />
        <Route path="/recipes" element={<ProtectedRoute element={Recipes} />} />
        <Route path="/record" element={<ProtectedRoute element={Record} />} />
        <Route path="/challenges" element={<ProtectedRoute element={Challenges} />} />
        <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
        <Route path="/progress-tracker" element={<ProtectedRoute element={Progress_Tracker} />} />
        <Route path="/activity-tracker" element={<ProtectedRoute element={Activity_Tracker} />} />

        {/* Redirect to Login page if no matching route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* Nav component should be hidden on login, signup, and signup-profile pages */}
      {location.pathname !== "/signup" && location.pathname !== "/login" && location.pathname !== "/signup-profile" && <Nav />}
    </>
  );
}

export default App;
