// C14
import React from 'react';
import './BackButton.css';
import backButtonImage from '../assets/BackButton.png'; 

const BackButton = ({ onClick }) => {
    return (
        <button className="back-button" onClick={onClick}>
            <img src={backButtonImage} alt="Back" className="back-button-image" />
        </button>
    );
};

export default BackButton;
