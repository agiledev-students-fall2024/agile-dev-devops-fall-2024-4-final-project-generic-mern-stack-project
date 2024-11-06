/**
 * A React component that represents a single page of the app.
 * Use this file to create new pages as needed
 * Don't forget to add the new route to App.js
 */

import React, { useState } from 'react';
import '../assets/styles/App.css';
import logo from '../assets/images/dreamer-1.png';
import { Link } from 'react-router-dom';
import Button from '../components/button';



const Header = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
    return (
      <div>
         <header className="App-header">

          <Link to="/"> 
          
          <img src={logo} alt="Logo" className="logo" />

          </Link>


        <div className= "controls-container"> 

        <Button type="button"  onClick={() => window.location.href='/login'}>Login</Button>

        <div className="dropdown">
          <button className="hamburger-menu" onClick={toggleDropdown}>
            &#9776; {/* Hamburger Icon */}
          </button>

        </div>



          {/* Conditionally render the dropdown menu based on state */}
          {isOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/profile">User Settings</Link></li>
            </ul>
          )}
        </div>
      </header>
      </div>
    )
  }

  export default Header