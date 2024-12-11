import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './DailyView.css';

const DailyView = () => {
    const { month, day, year } = useParams(); // Get the day from the URL
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem("auth_token"); // Retrieve JWT token

            if (!token) {
                console.error("Unauthorized access. Please log in.");
                navigate('/Login'); // Redirect to login if token is missing
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/calendar/${month}/${day}/${year}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token in request
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTasks(data);
                } else {
                    console.error("Failed to fetch tasks:", response.statusText);
                    alert("Failed to fetch tasks. Please log in again.");
                    localStorage.removeItem("auth_token");
                    navigate('/Login');
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
                alert("An error occurred while fetching tasks. Please try again.");
            }
        };

        fetchTasks();
    }, [month, day, year, navigate]);

    return (
        <div className="daily-view-container">
            <h1 className="page-title">Tasks for {month}/{day}/{year}</h1>

            <div className="task-list">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task._id} className="task-item">
                            <span className="task-name">{task.name}</span>
                            <span className={`task-status ${task.status}`}>{task.status}</span>
                        </div>
                    ))
                ) : (
                    <p>No tasks for this day.</p>
                )}
            </div>

            <Link to="/Calendar_monthly" className="back-btn">Back to Calendar</Link>
        </div>
    );
};

export default DailyView;
