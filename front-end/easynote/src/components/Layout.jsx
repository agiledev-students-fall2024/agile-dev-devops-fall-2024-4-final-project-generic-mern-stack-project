import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useProfile } from './ProfileContext';

const Layout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, setUser } = useProfile();
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      <header className="header">
        <div className="menu-icon" onClick={toggleNav}>☰</div>
        <div className="logo"></div>
        <div className="profile-section">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="account-icon"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
          ) : (
            <div
              className="account-icon"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            ></div>
          )}
          {isProfileOpen && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-item">
                <strong>{user?.name}</strong>
              </div>
              <div className="profile-dropdown-item">
                {user?.occupation}
              </div>
              <div className="profile-dropdown-item">
                Studying: {user?.studying}
              </div>
              <div className="profile-dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </header>

      <nav className={`nav-sidebar ${isNavOpen ? 'nav-sidebar-open' : ''}`}>
        <ul className="nav-list">
          <li><Link to="/" className="nav-link" onClick={() => setIsNavOpen(false)}>Home</Link></li>
          <li><Link to="/new-note" className="nav-link" onClick={() => setIsNavOpen(false)}>New Note</Link></li>
          <li><Link to="/math" className="nav-link" onClick={() => setIsNavOpen(false)}>Math Notes</Link></li>
          <li><Link to="/export" className="nav-link" onClick={() => setIsNavOpen(false)}>Export</Link></li>
          <li><Link to="/existing-notes" className="nav-link" onClick={() => setIsNavOpen(false)}>Existing Notes</Link></li>
        </ul>
      </nav>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;