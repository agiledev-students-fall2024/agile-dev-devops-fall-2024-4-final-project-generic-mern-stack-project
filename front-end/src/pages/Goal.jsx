import GoalForm from './GoalForm';
import React, { useEffect, useState } from 'react';
import './Goal.css';
import { FacebookShareButton, EmailShareButton, LinkedinShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const Goal = () => {
    const [goals, setGoals] = useState([]); // List of created goals
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGoalIndex, setCurrentGoalIndex] = useState(null); // Track which goal is being edited

    // Fetch goals from backend on component mount
    useEffect(() => {
        fetch("http://localhost:3001/goal") 
            .then(response => response.json())
            .then(data => setGoals(data))  
            .catch(error => console.error('Error fetching goals:', error));
    }, []); 

    const handleClick = () => {
        setShowShareOptions(!showShareOptions);
    };

    const handleiMessageShare = () => {
        if (navigator.share) {
            navigator.share({
                title: "Check out my goal on Goal Tracker!",
                text: "I'm tracking my goals. Join me in reaching our dreams!",
                url: `${window.location.origin}/goal`
            }).catch((error) => console.log("Error sharing", error));
        } else {
            alert("Sharing is not supported on this browser.");
        }
    };

    // Add a new goal or edit an existing one
    const handleAddOrEditGoal = (goal) => {
        if (isEditing && currentGoalIndex !== null) {
            const updatedGoals = [...goals];
            updatedGoals[currentGoalIndex] = goal; // Update the current goal
            setGoals(updatedGoals);
            setIsEditing(false);
            setCurrentGoalIndex(null);
        } else {
            setGoals([...goals, goal]); // Add a new goal
        }
    };

    // Trigger edit mode
    const handleEditGoal = (index) => {
        setIsEditing(true);
        setCurrentGoalIndex(index);
    };

    // Delete a goal
    const handleDeleteGoal = (index) => {
        const updatedGoals = goals.filter((_, i) => i !== index);
        setGoals(updatedGoals);
    };

    return (
        <main className="Goal">
            <h1>Goals</h1>
            <div className="grid-container">
                <div className="grid-item1">
                    <div>
                        <button type="button" className="button" onClick={handleClick}>
                            Share a Goal
                        </button>
                    </div>

                    {showShareOptions && (
                        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                            <FacebookShareButton url={`${window.location.origin}/goal`}>
                                <FontAwesomeIcon icon={faFacebook} size="2x" />
                            </FacebookShareButton>
                            <EmailShareButton url={`${window.location.origin}/goal`}>
                                <FontAwesomeIcon icon={faEnvelope} size="2x" />
                            </EmailShareButton>
                            <LinkedinShareButton url={`${window.location.origin}/goal`}>
                                <FontAwesomeIcon icon={faLinkedin} size="2x" />
                            </LinkedinShareButton>
                            <button className="button" onClick={handleiMessageShare}>
                                <FontAwesomeIcon icon={faCommentDots} size="2x" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid-item3">
                    <h2>{isEditing ? "Edit Goal" : "Create New Goal"}</h2>
                    <GoalForm
                        initialData={isEditing && goals[currentGoalIndex] ? goals[currentGoalIndex] : null}
                        onSubmit={handleAddOrEditGoal}
                    />
                </div>

                {/* Goals List */}
                <div className="goals-list">
                    <h2>Your Goals</h2>
                    {goals.length > 0 ? (
                        goals.map((goal, index) => (
                            <div key={index} className="goal-item">
                                <h3>{goal.username}</h3>
                                <p>Spending: {goal.spending}</p>
                                <p>Details: {goal.spendingDetails}</p>
                                <button className="edit-button" onClick={() => handleEditGoal(index)}>
                                    Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteGoal(index)}>
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No goals added yet.</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Goal;
