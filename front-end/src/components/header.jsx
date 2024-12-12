import React from 'react';
import './header.css';

function Header() {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    return (
        <div className="header-container">
            <h1 className="header-month">{currentMonth}</h1>
            <div className="header-title">
                <p className="header-budget">Personal Budget</p>
            </div>
        </div>
    );
}

export default Header;
