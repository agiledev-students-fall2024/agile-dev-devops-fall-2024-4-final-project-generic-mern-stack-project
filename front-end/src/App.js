import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import './App.css';

const App = () => {
    return (
        <div>
            <Header />
            <NavBar />
            <MainContent />
            <Footer />
        </div>
    );
};

export default App;