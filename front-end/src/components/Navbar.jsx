import React, { useContext, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { AccountCircle, FilterList, ArrowBack } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { AuthContext } from "../contexts/AuthContext";
import { AccountInfoContext } from "../contexts/AccountInfoContext";
import FilterPopup from "./FilterPopup";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  const { setFilters } = useContext(AccountInfoContext);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleFilterClick = () => {
    setFilterOpen(true);
  };

  const handleBackClick = () => {
    navigate("/feed");
  };

  const isFeedPage = location.pathname === "/feed";

  return (
    <AppBar position="fixed" className="nav-bar">
      <Toolbar>
        {isAuthenticated &&
          (isFeedPage ? (
            <IconButton edge="start" color="inherit" onClick={handleFilterClick}>
              <FilterList />
            </IconButton>
          ) : (
            <IconButton edge="start" color="inherit" onClick={handleBackClick}>
              <ArrowBack />
            </IconButton>
          ))}
        <Typography variant="h6" className="nav-title">
          Restaswipe
        </Typography>
        {isAuthenticated && (
          <IconButton edge="end" color="inherit" onClick={handleProfileClick}>
            <AccountCircle />
          </IconButton>
        )}
      </Toolbar>
      <FilterPopup
        open={filterOpen}
        close={() => setFilterOpen(false)}
      />
    </AppBar>
  );
};

export default NavBar;
