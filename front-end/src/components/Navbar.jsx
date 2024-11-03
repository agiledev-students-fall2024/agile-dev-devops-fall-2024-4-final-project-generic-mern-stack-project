import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { AuthContext } from "../contexts/AuthContext";
import { AccountInfoContext } from "../contexts/AccountInfoContext";
import FilterPopup from "./FilterPopup";

/* eslint-disable no-unused-vars */

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
    <nav className="nav-bar">
      <div className="toolbar">
        {isAuthenticated &&
          (isFeedPage ? (
            <button className="icon-button" onClick={handleFilterClick}>
              {/* Replace with an icon or text */}
              <span className="icon">🔍</span> {/* Or use a filter icon */}
            </button>
          ) : (
            <button className="icon-button" onClick={handleBackClick}>
              {/* Replace with an icon or text */}
              <span className="icon">←</span> {/* Or use a back arrow */}
            </button>
          ))}
        <h1 className="nav-title">Restaswipe</h1>
        {isAuthenticated && (
          <button className="icon-button" onClick={handleProfileClick}>
            {/* Replace with an icon or text */}
            <span className="icon">👤</span> {/* Or use a profile icon */}
          </button>
        )}
      </div>
      <FilterPopup open={filterOpen} close={() => setFilterOpen(false)} />
    </nav>
  );
};

export default NavBar;
