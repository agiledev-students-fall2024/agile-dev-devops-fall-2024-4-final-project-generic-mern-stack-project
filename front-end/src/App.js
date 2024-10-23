import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/assets/styles/App.css';
import '../src/assets/styles/output.css'
import Header from './pages/Header'
import Footer from './pages/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UserSettings from './pages/UserSettings'

const App = props => {

  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App-main">
          <Routes>
            {/* a route for the home page */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* a route for the about page */}
            <Route path="/about" element={<About />} />

            {/* a route for the login page */}
            <Route path="/login" element={<Login />} />

            {/* a route for the login page */}
            <Route path="/register" element={<Register />} />

            {/* a route for the profile page */}
            <Route path="/profile" element={<Profile />} />

            {/* a route for the profile page */}
            <Route path="/user-settings" element={<UserSettings />} />
            
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>

  );
}

export default App;


