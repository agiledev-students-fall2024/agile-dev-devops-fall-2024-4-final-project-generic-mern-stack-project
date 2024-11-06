/**
 * A React component that represents a single page of the app.
 * Use this file to create new pages as needed
 * Don't forget to add the new route to App.js
 */

import React, { useState } from 'react';
import '../assets/styles/App.css';

const Footer = props => {
    return (
      <div>
        <footer>
        <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Dreamers. 
        </div>
        </footer>
        </div>
    )
  }

  export default Footer