import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Goals.css";
import TaskModal from './TaskModal';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const collect = async () => {
            setLoading(true);
            const user = await JSON.parse(window.localStorage.getItem('session_user'));
            const response = await fetch(`http://localhost:4000/goals/${user._id}`);
            const data = await response.json();
            setGoals(data);
            setLoading(false);
        };
        collect();
    }, []);

    const [selectedGoal, setSelectedGoal] = useState(null);

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
                        <div className="goal-item" key={index} onClick={() => setSelectedGoal(goal)}>
                            <h3>{goal.title}</h3>
                            <p>Due Date: {new Date(goal.dueDate).toLocaleDateString()}</p>
                            <div className="progress-container">
                                <p>{`${goal.completed_tasks.length} / ${goal.tasks.length}`}</p>
                                <progress value={(goal.completed_tasks.length / goal.tasks.length) * 100} max="100"></progress>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Link to="/Homepage" className="home-btn">Home</Link>
            {selectedGoal && (
                <TaskModal goal={selectedGoal} onClose={() => setSelectedGoal(null)} />
            )}
        </div>
    );
};

export default Goals;
