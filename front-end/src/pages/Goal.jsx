import GoalForm from './GoalForm';
import React, { useEffect, useState } from 'react';
import './Goal.css';
import { FacebookShareButton, EmailShareButton, LinkedinShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const Goal = () => {
    const [goals, setGoals] = useState([]); 
    const [transactions, setTransactions] = useState([]);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGoalIndex, setCurrentGoalIndex] = useState(null); 
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // Fetch goals and transactions from the backend
    useEffect(() => {
        fetch("http://localhost:3001/goal") 
            .then(response => response.json())
            .then(data => setGoals(data))  
            .catch(error => console.error('Error fetching goals:', error));
        
        fetch("http://localhost:3001/api/transactions")
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.error('Error fetching transactions:', error));
    }, []); 

    // Function to increment 'current' value based on frequency
    useEffect(() => {
        const updateGoalAmounts = () => {
            setGoals(prevGoals => 
                prevGoals.map(goal => {
                    let incrementAmount = 0;
                    if (goal.frequency === "daily") incrementAmount = goal.amount;
                    if (goal.frequency === "monthly") incrementAmount = goal.amount / 30;
                    if (goal.frequency === "annual") incrementAmount = goal.amount / 365;
                    
                    return { ...goal, current: goal.current + incrementAmount };
                })
            );
        };

        const interval = setInterval(updateGoalAmounts, 24 * 60 * 60 * 1000); // Update daily

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [goals]);

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
        const newGoal = {
            name: goal.username, 
            target: goal.spendingDetails, 
            current: 0,
            amount: goal.amount, 
            frequency: goal.frequency 
        };

        if (isEditing && currentGoalIndex !== null) {
            const updatedGoals = [...goals];
            updatedGoals[currentGoalIndex] = newGoal; 
            setGoals(updatedGoals);
            setIsEditing(false);
            setCurrentGoalIndex(null);
        } else {
            setGoals([...goals, { ...newGoal, id: goals.length + 1 }]); 
        }
    };

    const handleEditGoal = (index) => {
        setIsEditing(true);
        setCurrentGoalIndex(index);
    };

    const handleDeleteGoal = (index) => {
        const updatedGoals = goals.filter((_, i) => i !== index);
        setGoals(updatedGoals);
    };

    const handleAddTransactionToGoal = (goalId) => {
        const transaction = transactions.find(trans => trans.id === parseInt(selectedTransaction));
        if (!transaction) return;

        const updatedGoals = goals.map(goal => {
            if (goal.id === goalId) {
                return {
                    ...goal,
                    current: goal.current + transaction.amount // Add transaction amount to goal's current value
                };
            }
            return goal;
        });
        setGoals(updatedGoals);
        setSelectedTransaction(null); 
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
                            <div key={goal.id} className="goal-item">
                                <h3>{goal.name}</h3>
                                <p>Target: ${goal.target}</p>
                                <p>Current: ${goal.current}</p>
    
                                {/* Progress Bar */}
                                <div className="progress-bar-container">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                                    >
                                        {Math.round((goal.current / goal.target) * 100)}% Achieved
                                    </div>
                                </div>
    
                                <button className="edit-button" onClick={() => handleEditGoal(index)}>
                                    Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteGoal(index)}>
                                    Delete
                                </button>
    
                                {/* Button to link transactions */}
                                <button className="trans-button" onClick={() => setSelectedGoal(goal.id)}>Link Transactions</button>
    
                                {/* Dropdown for selecting transactions for this goal */}
                                {selectedGoal === goal.id && (
                                    <div className="transaction-select">
                                        <h4>Select Transaction to Add</h4>
                                        <select
                                            value={selectedTransaction || ''}
                                            onChange={(e) => setSelectedTransaction(e.target.value)}
                                        >
                                            <option value="" disabled>Select a transaction</option>
                                            {transactions.map(transaction => (
                                                <option key={transaction.id} value={transaction.id}>
                                                    {transaction.merchant} - ${transaction.amount.toFixed(2)}
                                                </option>
                                            ))}
                                        </select>
                                        <button className="trans-button" onClick={() => handleAddTransactionToGoal(goal.id)}>
                                            Add to Goal
                                        </button>
                                    </div>
                                )}
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
