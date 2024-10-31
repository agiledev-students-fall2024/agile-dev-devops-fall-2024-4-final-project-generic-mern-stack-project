import React from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

function Homepage(){
  const nav = useNavigate()
  const handleTask = (e) => {
    nav('/Tasks')
  }
  const handleCalendar = (e) => {
    nav('/Calendar_monthly')
  }
  const handleGoal = (e) => {
    nav('/Goals')
  }
  const handleSignOut = () => {
    nav('/Login');
  };
  return (
    <div className="container">
      <h1>Task Destroyer</h1>

      <div className="urgent-tasks">
        <div className="task">Urgent Tasks</div>
      </div>

      <div className="menu">
        <button onClick={handleTask} className="menu-btn">Tasks</button>
        <button onClick={handleCalendar} className="menu-btn">Calendars</button>
        <button onClick={handleGoal} className="menu-btn">Goals</button>
        <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
      </div>
    </div>
  );
}

export default Homepage;