import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import './App.css';

const App = () => {
  const user = { name: "John Doe", profilePicture: "https://via.placeholder.com/100" };
  const isLoggedIn = !!user;

  return (
    <Router>
      <Header user={user} isLoggedIn={isLoggedIn} />
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
