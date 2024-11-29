import React, { useState, useEffect } from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

function Homepage(){
  const [urgentTasks, setUrgentTasks] = useState([]);
  const nav = useNavigate()

  useEffect(() => {
    const fetchUrgentTasks = async () => {
      const response = await fetch('http://localhost:4000/tasks/urgent');
      const data = await response.json();
      setUrgentTasks(data);
    };
    fetchUrgentTasks();
  }, []);

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
    localStorage.removeItem("session_user");
    nav('/Login');
  };
  return (
    <div className="container">
      <h1>Task Destroyer</h1>

      <div className="urgent-tasks">
        {urgentTasks.map((task) => (
          <div key={task.id}>
            {task.name}: due by {new Date(task.due).toLocaleDateString()}
          </div>
        ))}
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