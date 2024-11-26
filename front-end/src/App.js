import React from 'react';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PinProvider } from './PinContext'; 
import '../src/assets/styles/App.css';
import '../src/assets/styles/output.css';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import UserSettings from './pages/UserSettings';
import TestPage from './pages/TestPage';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import ModifyPins from './pages/ModifyPins';

import 'leaflet/dist/leaflet.css';


const App = props => {

  return (
    <div className="App">
      <PinProvider>
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

            {/* a route for the register page */}
            <Route path="/register" element={<Register />} />

            {/* a route for the user settings page */}
            <Route path="/user-settings" element={<UserSettings />} />

            {/* a route for the testing page */}
            <Route path="/testing" element={<TestPage />} />

            {/* a route for the contact page */}
            <Route path="/contact" element={<Contact />} />

            <Route path="/modify-pins" element={<ModifyPins />} />

            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      </PinProvider>
    </div>
  );
}

export default App;
