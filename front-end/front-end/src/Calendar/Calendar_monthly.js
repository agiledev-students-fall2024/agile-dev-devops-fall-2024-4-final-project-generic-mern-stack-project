import React from 'react';
import './Calendar_monthly.css';
//import './index.css'
import { Link } from 'react-router-dom';

const Calendar_monthly = () => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentDate = new Date(); 
    const month = currentDate.getMonth() + 1;
    const monthStr = monthNames[month - 1];
    const year = currentDate.getFullYear();

    // get the first date of the current month
    const firstDay = new Date(year, month, 1).getDay();
    // get the total days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // generate an array of all the days in the month
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // padding days for the first week (if the month doesn't start on Sunday)
    const paddedDaysArray = Array(firstDay).fill(null).concat(daysArray);

    // group days into weeks
    const weeks = [];
    for (let i = 0; i < paddedDaysArray.length; i += 7) {
        weeks.push(paddedDaysArray.slice(i, i + 7));
    }

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <main className="Calendar_monthly">
            <div className="container">
                <div className='title'>
                    <h2>{monthStr}, {year}</h2>
                </div>

                <div className="month">
                    <div className='header'>
                        {dayNames.map((dayName, index) => (
                            <div className="dayname" key={index}>{dayName}</div>
                        ))}
                    </div>

                    {weeks.map((week, weekIndex) => (
                        <div className="week" key={weekIndex}>
                            {week.map((day, dayIndex) => (
                                <div className="day" key={dayIndex}>
                                    {/* Day number with Link */}
                                    {day ? (
                                        <Link to={`/day/${day}`} className="day-link">
                                            {day}
                                        </Link>
                                    ) : ' '}
                                    
                                    {/* Conditionally render Tasks */}
                                    <div className='task_calendar'>
                                        {day !== null ? <p>Tasks:</p> : null} 
                                        {/* Placeholder for task count or actual data */}
                                        {day !== null ? <p>3</p> : null} 
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>     
        </main>
    );
}

export default Calendar_monthly;
