import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './components/ProfileContext';
import Layout from './components/Layout';
import Home from './components/Home';
import NewNote from './components/NewNote';
import ExistingNotes from './components/ExistingNotes';
import Login from './components/Login';
import Signup from './components/SignUp';
import AuthGuard from './components/AuthGuard';

const App = () => {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <AuthGuard>
                  <Home />
                </AuthGuard>
              }
            />
            <Route
              path="new-note"
              element={
                <AuthGuard>
                  <NewNote />
                </AuthGuard>
              }
            />
            <Route
              path="existing-notes"
              element={
                <AuthGuard>
                  <ExistingNotes />
                </AuthGuard>
              }
            />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  );
};

export default App;
