import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Goals.css";
import TaskModal from './TaskModal';
import TaskAction from './TaskAction';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [deleteGoal, setDeleteGoal] = useState(false);
    const [completeGoal, setCompleteGoal] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGoals = async () => {
            setLoading(true);
            const token = localStorage.getItem('auth_token'); // Retrieve JWT token

            if (!token) {
                alert("Unauthorized access. Please log in.");
                navigate('/Login'); // Redirect to login if token is missing
                return;
            }

            try {
                const response = await fetch('http://localhost:4000/goals', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include JWT token
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setGoals(data);
                } else {
                    console.error("Failed to fetch goals:", response.statusText);
                    alert("Failed to fetch goals. Please log in again.");
                    localStorage.removeItem('auth_token');
                    navigate('/Login');
                }
            } catch (error) {
                console.error("Error fetching goals:", error);
                alert("An error occurred while fetching goals. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchGoals();
    }, [trigger, navigate]);

    return (
        <div className="goal-container">
            <h1 className="page-title">Goals</h1>
            <Link to="/NewGoal" className="new-goal-btn">New</Link>
            <div className="goals-list">
                {loading ? (
                    <p>Loading...</p>
                ) : goals.length === 0 ? (
                    <p>No goals found</p>
                ) : (
                    goals.map((goal, index) => (
                        <div className="goal-item" key={index}>
                            <div onClick={() => setSelectedGoal(goal)}>
                                <h3>{goal.title}</h3>
                                <p>Due Date: {new Date(goal.dueDate).toLocaleDateString()}</p>
                                <div className="progress-container">
                                    <p>{`${goal.completed_tasks.length} / ${goal.tasks.length}`}</p>
                                    <progress
                                        value={(goal.completed_tasks.length / goal.tasks.length) * 100}
                                        max="100"
                                    ></progress>
                                </div>
                            </div>
                            {(goal.completed_tasks.length / goal.tasks.length) === 1 ? (
                                <button onClick={() => setCompleteGoal(goal)} className="new-goal-btn">Complete</button>
                            ) : (
                                <button onClick={() => setDeleteGoal(goal)} className="new-goal-btn">Delete</button>
                            )}
                        </div>
                    ))
                )}
            </div>
            <Link to="/Homepage" className="home-btn">Home</Link>
            {selectedGoal && (
                <TaskModal goal={selectedGoal} onClose={() => setSelectedGoal(null)} />
            )}
            {deleteGoal && (
                <TaskAction goal={deleteGoal} onClose={() => setDeleteGoal(null)} action="delete" trigger={trigger} setTrigger={setTrigger} />
            )}
            {completeGoal && (
                <TaskAction goal={completeGoal} onClose={() => setCompleteGoal(null)} action="complete" trigger={trigger} setTrigger={setTrigger} />
            )}
        </div>
    );
};

export default Goals;
