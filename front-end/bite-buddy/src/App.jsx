import Nav from './components/Footer.jsx'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Record from './pages/Record';
import Challenges from './pages/Challenges';
import Profile from './pages/Profile';
import Signup from './pages/Signup'
import Login from './pages/Login';
import Signup_Profile from './pages/Signup_profile';
import Activity_Tracker from './pages/Activity_Tracker';

function App() {
    const location = useLocation();
      return(
        
        <>
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/record" element={<Record />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element = {<Home/>}/>
          <Route path="/signup-profile" element = {<Signup_Profile />}/>
          <Route path="/activity-tracker" element = {<Activity_Tracker/>}/>

        </Routes>
        {location.pathname !== "/signup" && location.pathname !== "/login" && location.pathname !=="/signup-profile" && <Nav />}
        {/*{location.pathname !== "/signup" && location.pathname !== "/login" && location.pathname !=="/signup-profile" && <Hamburger />}*/}
          </>
      );
  }

export default App
