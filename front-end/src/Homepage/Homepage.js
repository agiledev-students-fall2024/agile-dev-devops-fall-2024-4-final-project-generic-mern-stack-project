import React, { useState, useEffect } from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const [urgentTasks, setUrgentTasks] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        const fetchUrgentTasks = async () => {
            const token = localStorage.getItem('auth_token'); // Retrieve the token

            if (!token) {
                alert("Unauthorized access. Please log in.");
                nav('/Login');
                return;
            }

            try {
                const response = await fetch('http://localhost:4000/tasks/urgent', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUrgentTasks(data);
                } else {
                    console.error('Failed to fetch urgent tasks:', response.statusText);
                    alert('Failed to fetch urgent tasks. Please log in again.');
                    localStorage.removeItem('auth_token');
                    nav('/Login');
                }
            } catch (error) {
                console.error('Error fetching urgent tasks:', error);
                alert('An error occurred. Please log in again.');
                localStorage.removeItem('auth_token');
                nav('/Login');
            }
        };

        fetchUrgentTasks();
    }, [nav]);

    const handleTask = () => {
        nav('/Tasks');
    };

    const handleCalendar = () => {
        nav('/Calendar_monthly');
    };

    const handleGoal = () => {
        nav('/Goals');
    };

    const handleSignOut = () => {
        // Remove token on logout
        localStorage.removeItem('auth_token');
        nav('/Login');
    };

    return (
        <div className="container">
            <h1>Task Destroyer</h1>

            <div className="urgent-tasks">
                {urgentTasks.length > 0 ? (
                    urgentTasks.map((task) => (
                        <div key={task._id}>
                            {task.name}: due by {new Date(task.due).toLocaleDateString()}
                        </div>
                    ))
                ) : (
                    <p>No urgent tasks found.</p>
                )}
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
