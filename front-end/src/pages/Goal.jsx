import React, { useEffect, useState } from 'react';
import './Goal.css';
import GoalForm from './GoalForm';
// import { FacebookShareButton, EmailShareButton, LinkedinShareButton } from 'react-share';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
// import { faEnvelope, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const Goal = ({ currentUserId }) => {
    const [goals, setGoals] = useState([]);
    const [transactions, setTransactions] = useState([]);
    // const [showShareOptions, setShowShareOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGoalId, setCurrentGoalId] = useState(null);
    // const [selectedGoals, setSelectedGoals] = useState([]);

    // Fetch goals and transactions
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token
                const userId = localStorage.getItem('id'); // Retrieve userId from localStorage

                if (!token || !userId) {
                    throw new Error('User not authenticated.');
                }

                const goalsResponse = await fetch(`http://localhost:3001/goals?userId=${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const goalsData = await goalsResponse.json();
                setGoals(goalsData);
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        fetchGoals();
    }, []);

    // Handle adding or editing goals
    const handleAddOrEditGoal = async (goal) => {
        const userId = localStorage.getItem('id'); // Ensure consistent userId fetching
        const token = localStorage.getItem('token');

        const newGoal = {
            name: goal.goalName,
            targetAmount: goal.spendingDetails,
            frequency: goal.spending,
            currentAmount: goal.currentAmount || 0,
            userId, // Include `userId` for backend
        };

        try {
            if (isEditing && currentGoalId) {
                const response = await fetch(`http://localhost:3001/goals/${currentGoalId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    body: JSON.stringify(newGoal),
                });
                if (!response.ok) throw new Error('Failed to update goal');
            } else {
                const response = await fetch('http://localhost:3001/goals', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    body: JSON.stringify(newGoal),
                });
                if (!response.ok) throw new Error('Failed to create goal');
            }

            // Refresh goals list
            const updatedGoalsResponse = await fetch(`http://localhost:3001/goals?userId=${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const updatedGoalsData = await updatedGoalsResponse.json();
            setGoals(updatedGoalsData);
        } catch (error) {
            console.error('Error saving goal:', error);
        }

        setIsEditing(false);
        setCurrentGoalId(null);
        localStorage.removeItem('goalId'); // Clear goalId from localStorage
    };

    // Handle goal deletion
    const handleDeleteGoal = async (goalId) => {
        const userId = localStorage.getItem('id'); 
        const token = localStorage.getItem('token'); 
    
        if (!userId) {
            console.error('User ID is missing');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3001/goals/${goalId}?userId=${userId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`, // Include token for authentication
                },
            });
    
            if (!response.ok) throw new Error('Failed to delete goal');
    
            // Update state after deletion
            setGoals(goals.filter((goal) => goal._id !== goalId));
        } catch (error) {
            console.error('Error deleting goal:', error);
        }
    };
    
    // Toggle sharing options
    // const toggleShareOptions = () => {
    //     setShowShareOptions(!showShareOptions);
    // };

    // Handle goal sharing
    // const getSelectedGoalsText = () => {
    //     return goals
    //         .filter((goal) => selectedGoals.includes(goal._id))
    //         .map((goal) => `${goal.name} (${Math.round((goal.currentAmount / goal.targetAmount) * 100)}% Achieved)`)
    //         .join(', ');
    // };

    return (
        <main className="Goal">
            <h1>Goals</h1>
            <div className="grid-container">
                {/* Share Goals Section */}
                {/* <div className="grid-item1">
                    <button type="button" className="button" onClick={toggleShareOptions}>
                        Share a Goal
                    </button>
                    {showShareOptions && (
                        <div className="share-options">
                            <h3>Select Goals to Share:</h3>
                            {goals.map((goal) => (
                                <div key={goal._id} className="goal-share-item">
                                    <input
                                        type="checkbox"
                                        id={`goal-${goal._id}`}
                                        checked={selectedGoals.includes(goal._id)}
                                        onChange={() =>
                                            setSelectedGoals((prev) =>
                                                prev.includes(goal._id)
                                                    ? prev.filter((id) => id !== goal._id)
                                                    : [...prev, goal._id]
                                            )
                                        }
                                    />
                                    <label htmlFor={`goal-${goal._id}`}>
                                        {goal.name} ({Math.round((goal.currentAmount / goal.targetAmount) * 100)}% Achieved)
                                    </label>
                                </div>
                            ))}
                            <div className="share-buttons">
                                <FacebookShareButton url={`${window.location.origin}/goal`}>
                                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                                </FacebookShareButton>
                                <EmailShareButton
                                    url={`${window.location.origin}/goal`}
                                    subject="Check out my goals!"
                                    body={`I'm tracking these goals: ${getSelectedGoalsText()}`}
                                >
                                    <FontAwesomeIcon icon={faEnvelope} size="2x" />
                                </EmailShareButton>
                                <LinkedinShareButton
                                    url={`${window.location.origin}/goal`}
                                    title="My Goals on Goal Tracker"
                                    summary={`Here are my goals: ${getSelectedGoalsText()}`}
                                >
                                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                                </LinkedinShareButton>
                            </div>
                        </div>
                    )}
                </div> */}

                {/* Create/Edit Goals Section */}
                <div className="grid-item3">
                    <h2>{isEditing ? 'Edit Goal' : 'Create New Goal'}</h2>
                    <GoalForm
                        initialData={isEditing ? goals.find((goal) => goal._id === currentGoalId) : null}
                        onSubmit={handleAddOrEditGoal}
                    />
                </div>

                {/* Goals List Section */}
                <div className="goals-list">
                    <h2>Your Goals</h2>
                    {goals.length > 0 ? (
                        goals.map((goal) => (
                            <div key={goal._id} className="goal-item">
                                <h3>{goal.name}</h3>
                                <p>Target: ${goal.targetAmount}</p>
                                <p>Current: ${goal.currentAmount}</p>
                                <div className="progress-bar-container">
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: `${(goal.currentAmount / goal.targetAmount) * 100}%`,
                                        }}
                                    >
                                        {Math.round((goal.currentAmount / goal.targetAmount) * 100)}% Achieved
                                    </div>
                                </div>
                                <button className="edit-button" onClick={() => {
                                    setIsEditing(true);
                                    setCurrentGoalId(goal._id);
                                    localStorage.setItem('goalId', goal._id); // Store goalId for editing
                                }}>
                                    Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteGoal(goal._id)}>
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
