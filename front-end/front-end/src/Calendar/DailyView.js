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
            try {
                const response = await fetch(`http://localhost:4000/calendar/${month}/${day}/${year}`);
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [month, day, year]);
    


    return (
        <div className="daily-view-container">
            <h1 className="page-title">Tasks for Day {day}</h1>

            <div className="task-list">
                {tasks.map((task) => (
                    <div key={task.id} className="task-item">
                        <span className="task-name">{task.name}</span>
                        <span className={`task-status ${task.status}`}>{task.status}</span> 
                    </div>
                ))}
            </div>

            <Link to="/Calendar_monthly" className="back-btn">Back to Calendar</Link>
        </div>
    );
};

export default DailyView;
