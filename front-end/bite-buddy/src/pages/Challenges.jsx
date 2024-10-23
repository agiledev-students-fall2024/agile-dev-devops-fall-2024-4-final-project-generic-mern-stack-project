import '../index.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Challenges.css';

const Challenges = () => {
    const [challengesData, setChallengesData] = useState([]);
    const [selectedChallenge, setSelectedChallenge] = useState(null);



    useEffect(() => {
        const fetchChallengesData = async () => {
            const response = await axios.get('https://my.api.mockaroo.com/challenges.json?key=d1ce50e0');
            const fetchedData = response.data || [];
            console.log(fetchedData)

            setChallengesData([...fetchedData]);
        };

        fetchChallengesData();
    }, []); 
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
                    <div className="challenge-image">
                        <img src={challenge.image} alt={`Challenge ${index + 1}`} />
                    </div>
                    <button className="start-button" onClick={handleStartButton}>START CHALLENGE</button>
                </div>
            ))}

            {selectedChallenge && (
                <div className="full-page-card">
                    <button className="close-button" onClick={closeFullCard}>X</button>
                    <h2>{selectedChallenge.title}</h2>
                    <p>{selectedChallenge.description}</p>
                    <div className="challenge-image-popup">
                        <img src={selectedChallenge.image} alt={`Challenge image`} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Challenges;
