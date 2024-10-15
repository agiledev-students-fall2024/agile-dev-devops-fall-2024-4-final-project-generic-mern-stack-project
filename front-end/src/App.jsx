import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import ChatComponent from './components/Chat';
import JoinCreateMeetingPage from './pages/JoinCreateMeetingPage';
import Whiteboard from './components/Whiteboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/joincreatemeeting" element={<JoinCreateMeetingPage />} />
      <Route path="/chat" element={<ChatComponent />} />
      <Route path="/whiteboard" element={<Whiteboard />} />
    </Routes>
  );
};

export default App;
