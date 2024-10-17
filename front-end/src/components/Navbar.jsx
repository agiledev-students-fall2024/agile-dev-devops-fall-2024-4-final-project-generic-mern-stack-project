import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { AccountCircle, FilterList, ArrowBack } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        {isFeedPage ? (
          <IconButton edge="start" color="inherit" onClick={handleFilterClick}>
            <FilterList />
          </IconButton>
        ) : (
          <IconButton edge="start" color="inherit" onClick={handleBackClick}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" className="nav-title">
          Restaswipe
        </Typography>
        <IconButton edge="end" color="inherit" onClick={handleProfileClick}>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
