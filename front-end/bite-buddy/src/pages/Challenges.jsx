import '../index.css'
import React from 'react'
import { Link } from 'react-router-dom';
import './Challenges.css'


//temp data placeholder
const challengesData = [
    { title: "Challenge Title", description: "text text text text text text text text text text text text text text text text ", image: "Challenge Image" },
    { title: "Challenge Title", description: "text text text text text text text text text text text text text text text text ", image: "Challenge Image" },
    { title: "Challenge Title", description: "text text text text text text text text text text text text text text text text ", image: "Challenge Image" },
    { title: "Challenge Title", description: "text text text text text text text text text text text text text text text text ", image: "Challenge Image" },
    { title: "Challenge Title", description: "text text text text text text text text text text text text text text text text ", image: "Challenge Image" }
]

const Challenges = () => {
    return (
        <div className="challenges-container">
            <h1>CHALLENGES</h1>
            {challengesData.map((challenge, index) => (
                <div className="challenge-card" key={index}>
                    <h2>CHALLENGE #{index + 1}</h2>
                    <h3>{challenge.title}</h3>
                    <p>{challenge.description}</p>
                    <div className="challenge-image">{challenge.image}</div>
                    {/* add component to button */}
                    <button className="start-button">START CHALLENGE</button> 
                </div>
            ))}
        </div>
    );
};

export default Challenges;