import '../index.css';
import React, { useState, useEffect } from "react";
import axios from '../axiosConfig';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Challenges.css';

const Challenges = () => {
    const [challengesData, setChallengesData] = useState([]);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const navigate = useNavigate()


    useEffect(() => {
        const fetchChallengesData = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_BACK_PORT}/api/challenges`);
                setChallengesData([...response.data])
            } catch (error){
                console.log('Error fetching activities')
            }
        };

        fetchChallengesData();
    }, []); 

    const handleStartClick = (challenge) => {
        setSelectedChallenge(challenge);
    };

    const closeFullCard = () => {
        setSelectedChallenge(null);
    };

    const handleStartChallenge = (recipeId) => {
        // Navigate to the record activity page, passing the recipe data
        console.log('going to recipe id:' +recipeId)
        navigate('/record', { state: { recipeId } });
      };

    return (
        <div className="challenges-container">
            <h1>CHALLENGES</h1>
            {challengesData.map((challenge, index) => (
                <div className="challenge-card" onClick={() => handleStartClick(challenge)} key={index}>
                    <h2>CHALLENGE #{index + 1}</h2>
                    <h3>{challenge.challenge_name}</h3>
                    <p>{challenge.challenge_brief}</p>
                    <div className="challenge-image">
                        <img src={challenge.image} alt={`Challenge ${index + 1}`} />
                    </div>
                    <button className="start-button" onClick={() => handleStartChallenge(challenge.recipe_id)}>START CHALLENGE</button>
                </div>
            ))}

            {selectedChallenge && (
                <div className="full-page-card">
                    <button className="close-button" onClick={closeFullCard}>X</button>
                    <h2>{selectedChallenge.challenge_name}</h2>
                    <p>{selectedChallenge.challenge_long}</p>
                    <div className="challenge-image-popup">
                        <img src={selectedChallenge.image} alt={`Challenge image`} />
                    </div>
                    <button className="start-button different-color" onClick={() => handleStartChallenge(selectedChallenge.recipe_id)}>START CHALLENGE</button>
                </div>
            )}
        </div>
    );
};

export default Challenges;
