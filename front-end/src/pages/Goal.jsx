import React, { useEffect, useState } from 'react';
import './Goal.css';
import GoalForm from './GoalForm';

const Goal = ({ currentUserId }) => {
    const [goals, setGoals] = useState([]);
    const [currentGoal, setCurrentGoal] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [selectedGoalId, setSelectedGoalId] = useState(null);

    // Fetch goals
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('id');

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

    // Fetch transactions
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const userId = localStorage.getItem('id');
                const response = await fetch(`http://localhost:3001/api/transactions?userId=${userId}`);
                if (!response.ok) throw new Error('Failed to fetch transactions');
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    // Handle adding or editing goals
   // Handle adding or editing goals
   const handleAddOrEditGoal = async (goal) => {
    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const newGoal = {
        name: goal.goalName,
        targetAmount: parseFloat(goal.spendingDetails),
        frequency: goal.spending,
        userId,
        // When editing, keep the existing currentAmount, otherwise set to 0
        currentAmount: currentGoal ? currentGoal.currentAmount : 0,
    };

    try {
        if (currentGoal) {
            const response = await fetch(`http://localhost:3001/goals/${currentGoal._id}`, {
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
        
        setShowEditModal(false);
        setCurrentGoal(null);
    } catch (error) {
        console.error('Error saving goal:', error);
    }
};

    // Handle linking transaction to goal
    const handleLinkTransaction = async (transactionId, amount) => {
        const userId = localStorage.getItem('id');
        try {
            const response = await fetch(`http://localhost:3001/goals/${selectedGoalId}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    amount: parseFloat(amount)
                }),
            });

            if (!response.ok) throw new Error('Failed to link transaction');

            // Refresh goals to show updated amount
            const updatedGoalsResponse = await fetch(`http://localhost:3001/goals?userId=${userId}`);
            const updatedGoalsData = await updatedGoalsResponse.json();
            setGoals(updatedGoalsData);
            
            setShowTransactionModal(false);
            setSelectedGoalId(null);
        } catch (error) {
            console.error('Error linking transaction:', error);
        }
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
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to delete goal');
            setGoals(goals.filter((goal) => goal._id !== goalId));
        } catch (error) {
            console.error('Error deleting goal:', error);
        }
    };

    return (
        <main className="Goal">
            <h1>Goals</h1>
            <div className="grid-container">
                {/* Create Goals Section */}
                <div className="grid-item3">
                    <h2>Create New Goal</h2>
                    <GoalForm onSubmit={handleAddOrEditGoal} />
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
                                <div className="button-group">
                                    <button 
                                        className="edit-button" 
                                        onClick={() => {
                                            setCurrentGoal(goal);
                                            setShowEditModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="delete-button" 
                                        onClick={() => handleDeleteGoal(goal._id)}
                                    >
                                        Delete
                                    </button>
                                    <button 
                                        className="link-button"
                                        onClick={() => {
                                            setSelectedGoalId(goal._id);
                                            setShowTransactionModal(true);
                                        }}
                                    >
                                        Link Transaction
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No goals added yet.</p>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Edit Goal</h2>
                            <button 
                                className="modal-close-button"
                                onClick={() => {
                                    setShowEditModal(false);
                                    setCurrentGoal(null);
                                }}
                            >
                                ×
                            </button>
                        </div>
                        {currentGoal && (
                            <GoalForm
                                initialData={{
                                    goalName: currentGoal.name,
                                    spending: currentGoal.frequency,
                                    spendingDetails: currentGoal.targetAmount.toString()
                                }}
                                onSubmit={handleAddOrEditGoal}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* Transaction Linking Modal */}
            {showTransactionModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Link Transaction to Goal</h2>
                            <button 
                                className="modal-close-button"
                                onClick={() => {
                                    setShowTransactionModal(false);
                                    setSelectedGoalId(null);
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <div className="transaction-list">
                            {transactions.map(transaction => (
                                <div key={transaction._id} className="transaction-item">
                                    <p>{transaction.merchant} - ${transaction.amount}</p>
                                    <p className="transaction-date">
                                        {new Date(transaction.date).toLocaleDateString()}
                                    </p>
                                    <button
                                        onClick={() => handleLinkTransaction(transaction._id, transaction.amount)}
                                        className="link-transaction-button"
                                    >
                                        Link to Goal
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Goal;