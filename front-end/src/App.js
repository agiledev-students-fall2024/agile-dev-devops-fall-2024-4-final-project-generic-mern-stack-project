// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "../src/contexts/AuthContext";
import { AccountInfoProvider } from "./contexts/AccountInfoContext";
import { SwipableFeedProvider } from "./contexts/SwipableFeedContext";
import "./App.css";

function App() {
  return (
    <AccountInfoProvider>
      <AuthProvider>
    <SwipableFeedProvider>
          <Router>
            <Navbar />
            <div className="app-content">
              <AppRoutes />
            </div>
          </Router>
    </SwipableFeedProvider>
    </AuthProvider>
    </AccountInfoProvider>

  );
}

export default App;
