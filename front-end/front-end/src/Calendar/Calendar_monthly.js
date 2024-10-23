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
    const monthStr = monthNames[month-1];
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

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];



    return (
        <main className="Calendar_monthly">
        <div className="container">
            <div className='title'>
                <h2>{monthStr}, {year}</h2>
            </div>

            <div className="month">

                <div className='header'>
                    {dayNames.map((dayName, index) => (
                        <div className="dayname" key={index}>
                            {dayName}
                        </div>
                    ))}
                </div>

                {weeks.map((week, weekIndex) => (
                    <div className="week" key={weekIndex}>
                        {week.map((day, dayIndex) => (
                            <div className="day" key={dayIndex}>
                                 {/* Display empty block if no day */}
                                {day || '  '}
                                 {/* Conditionally render Tasks */} 

                                <div className='task' >
                                    {day !== null ? <p>Tasks:</p> : null} 

                                    {/* if the database is implemented */}
                                    {/* {day !== null ? <p>{day.getTasks}</p> : null}  */}

                                    {day !== null ? <p>3</p> : null} 
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        
            <Link to="/" className="home-btn">Home</Link>     
        </div>     
        </main>

        
    )
}


export default Calendar_monthly;