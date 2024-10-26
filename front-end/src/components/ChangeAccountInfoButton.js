//C19


import React from 'react';
import './ChangeAccountInfoButton.css';

const ChangeAccountInfoButton = ({ label = "First Name", currentValue }) => {
    return (
        <div className="change-account-info-box">
            <label className="info-label">{label}</label>
            <p className="info-value">{currentValue}</p>
        </div>
    );
};

export default ChangeAccountInfoButton;
