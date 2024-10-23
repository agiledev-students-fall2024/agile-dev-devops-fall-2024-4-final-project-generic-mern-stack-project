import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {

    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/Tasks">Tasks</Link>
            <Link to="/Monthly_calendar">Calendar</Link>
            <Link to="/Goals">Goals</Link>
        </div>
    )
}

export default Header;