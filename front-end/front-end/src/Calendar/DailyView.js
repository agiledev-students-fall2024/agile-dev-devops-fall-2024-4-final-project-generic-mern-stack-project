import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DailyView.css';

const DailyView = () => {
    const { day } = useParams(); // Get the day from the URL
    const [tasks, setTasks] = useState([
        { id: 1, name: "Complete assignment", status: "ongoing" },
        { id: 2, name: "Meeting with team", status: "not_started" },
    ]);

    const handleStatusChange = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? 
            { ...task, status: task.status === 'finished' ? 'not_started' : 'finished' } : task
        ));
    };

    return (
        <div className="daily-view-container">
            <h1 className="page-title">Tasks for Day {day}</h1>

            <div className="task-list">
                {tasks.map((task) => (
                    <div key={task.id} className="task-item">
                        <span className="task-name">{task.name}</span>
                        <button 
                            onClick={() => handleStatusChange(task.id)}
                            className={task.status === 'finished' ? 'task-done-btn' : 'task-pending-btn'}
                        >
                            {task.status === 'finished' ? 'Done' : 'Mark as Done'}
                        </button>
                    </div>
                ))}
            </div>

            <Link to="/Calendar_monthly" className="back-btn">Back to Calendar</Link>
        </div>
    );
};

export default DailyView;
