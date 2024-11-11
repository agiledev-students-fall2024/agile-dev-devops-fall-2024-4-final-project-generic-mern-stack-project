import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DailyView.css';

const DailyView = () => {
    const { month, day, year } = useParams(); // Get the day from the URL
    const [tasks, setTasks] = useState([]);
    //uses params to search for object ids but nothing is stored in the database yet
    //mockaroo api also randomizes data, including ids, so populating the daily view accurately
    //based on task id is impossible without a database

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(`http://localhost:4000/calendar/${month}/${day}/${year}`);
            //const response = await fetch('http://localhost:4000/');
            const data = await response.json();
            setTasks(data);
        };
        fetchTasks();
    }, [])

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
