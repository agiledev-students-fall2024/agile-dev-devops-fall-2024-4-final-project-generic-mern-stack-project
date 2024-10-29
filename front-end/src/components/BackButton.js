// C14
import React from 'react';
import './BackButton.css';
import backButtonImage from '../assets/BackButton.png'; // Adjust the path based on your folder structure
import { IoIosArrowBack } from "react-icons/io";

const BackButton = ({ backButtonHandler }) => {
    return (
        <button className="back-button absolute top-7 left-5" onClick={backButtonHandler}>
            <IoIosArrowBack className="arrow-button"/>
        </button>
    );
};

export default BackButton;
