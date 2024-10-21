import '../index.css'
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Challenges.css'

const Challenges = () => {
    const [selectedChallenge, setSelectedChallenge] = useState(null);

    const challengesData = [
        { title: "Challenge Title", description: "text text text text text text text text text text text text text text text text ", image: "Challenge Image" },
        { title: "Challenge Title", description: "text text text text text text text text text text text text text text text text ", image: "Challenge Image" },
        { title: "Challenge Title", description: "text text text text text text text text text text text text text text text text ", image: "Challenge Image" },
        { title: "Challenge Title", description: "text text text text text text text text text text text text text text text text ", image: "Challenge Image" },
        { title: "Challenge Title", description: "text text text text text text text text text text text text text text text text ", image: "Challenge Image" }
    ]


    const handleStartClick = (challenge) => {
        setSelectedChallenge(challenge);
    };

    const closeFullCard = () => {
        setSelectedChallenge(null);
    };

    const handleStartButton = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="challenges-container">
            <h1>CHALLENGES</h1>
            {challengesData.map((challenge, index) => (
                <div className="challenge-card" onClick={() => handleStartClick(challenge)} key={index}>
                    <h2>CHALLENGE #{index + 1}</h2>
                    <h3>{challenge.title}</h3>
                    <p>{challenge.description}</p>
                    <div className="challenge-image">{challenge.image}</div>
                    <button className="start-button" onClick={handleStartButton}>START CHALLENGE</button>
                </div>
            ))}

            {selectedChallenge && (
                <div className="full-page-card">
                    <button className="close-button" onClick={closeFullCard}>X</button>
                    <h2>{selectedChallenge.title}</h2>
                    <p>{selectedChallenge.description}</p>
                    <div className="challenge-image">{selectedChallenge.image}</div>
                </div>
            )}
        </div>
    );
};

export default Challenges;