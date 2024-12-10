import React, { useEffect, useState } from 'react';
import './Calendar_monthly.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Calendar_monthly = () => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentDate = new Date(); 
    const month = currentDate.getMonth() + 1;
    const monthStr = monthNames[month - 1];
    const year = currentDate.getFullYear();

    // Get the first date of the current month
    const firstDay = new Date(year, month - 1, 1).getDay();
    // Get the total days in the month
    const daysInMonth = new Date(year, month, 0).getDate();
    // Generate an array of all the days in the month
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Padding days for the first week (if the month doesn't start on Sunday)
    const paddedDaysArray = Array(firstDay).fill(null).concat(daysArray);

    // Group days into weeks
    const weeks = [];
    for (let i = 0; i < paddedDaysArray.length; i += 7) {
        weeks.push(paddedDaysArray.slice(i, i + 7));
    }

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [taskCounts, setTaskCounts] = useState({});

    // Fetch task counts for each day in the current month
    useEffect(() => {
        const fetchTaskCounts = async () => {
            const token = localStorage.getItem('auth_token'); // Retrieve token

            if (!token) {
                console.error("Unauthorized access. Please log in.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:4000/calendar/month/${year}/${month}/tasks`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include JWT token
                    },
                });
                const taskData = response.data;

                console.log("Monthly API Response:", taskData);

                // Convert task data into an object with day as the key
                const taskCounts = taskData.reduce((acc, { day, count }) => {
                    acc[day] = count;
                    return acc;
                }, {});

                setTaskCounts(taskCounts);
            } catch (error) {
                console.error("Error fetching task counts:", error);
            }
        };
        fetchTaskCounts();
    }, [year, month]);

    return (
        <main>
            <div className="calendar-container">
                <div className="title">
                    <h2>{monthStr}, {year}</h2>
                </div>

                <div className="month">
                    <div className="header">
                        {dayNames.map((dayName, index) => (
                            <div className="dayName" key={index}>{dayName}</div>
                        ))}
                    </div>

                    {weeks.map((week, weekIndex) => (
                        <div className="week" key={weekIndex}>
                            {week.map((day, dayIndex) => (
                                <div className="day" key={dayIndex}>
                                    {/* Day number with Link */}
                                    {day ? (
                                        <Link to={`/${month}/${day}/${year}`} className="day-link">
                                            {day}
                                        </Link>
                                    ) : ' '}
                                    
                                    {/* Conditionally render Tasks */}
                                    <div className="task_calendar">
                                        {day !== null ? <p>Tasks:</p> : null} 
                                        {day !== null ? <p>{taskCounts[day] || 0}</p> : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>     
        </main>
    );
};

export default Calendar_monthly;
