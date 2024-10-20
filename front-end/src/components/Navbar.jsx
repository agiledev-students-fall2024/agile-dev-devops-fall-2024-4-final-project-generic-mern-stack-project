// src/components/NavBar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { AccountCircle, FilterList, ArrowBack } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { AuthContext } from '../contexts/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleFilterClick = () => {
    console.log('Filter icon clicked');
  };

  const handleBackClick = () => {
    navigate('/feed');
  };

  // Check if the current path is '/feed'
  const isFeedPage = location.pathname === '/feed';

  return (
    <AppBar position="fixed" className="nav-bar">
      <Toolbar>
        {isAuthenticated && (
          isFeedPage ? (
            <IconButton edge="start" color="inherit" onClick={handleFilterClick}>
              <FilterList />
            </IconButton>
          ) : (
            <IconButton edge="start" color="inherit" onClick={handleBackClick}>
              <ArrowBack />
            </IconButton>
          )
        )}
        <Typography variant="h6" className="nav-title">
          Restaswipe
        </Typography>
        {isAuthenticated && (
          <IconButton edge="end" color="inherit" onClick={handleProfileClick}>
            <AccountCircle />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
