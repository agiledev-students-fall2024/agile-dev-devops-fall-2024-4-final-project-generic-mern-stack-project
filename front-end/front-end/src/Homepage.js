import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';
const Homepage = () => {
  return (
    <div className="container">
      <h1>Task Destroyer</h1>

      <div className="urgent-tasks">
        <div className="task">Urgent Task1: due by XX/XX</div>
        <div className="task">Urgent Task2: due by XX/XX</div>
        <div className="task">Urgent Task3: due by XX/XX</div>
      </div>

      <div className="menu">
        <Link to="/Tasks" className="menu-btn">Tasks</Link> 
        <Link to="/Monthly_calendar" button className="menu-btn">Calendars</Link>
        <button className="menu-btn">Goal Setting</button>
      </div>
    </div>
  );
}

export default Homepage;