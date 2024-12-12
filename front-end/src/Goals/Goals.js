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
    const nav = useNavigate();

    useEffect(() => {
        const collect = async () => {
            setLoading(true);
            const user = await JSON.parse(window.localStorage.getItem('session_user'));
            const token = window.localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/goals/${user?._id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                }
            });
            if (response.status === 401 || response.error === "Invalid token" || response.error === "No token provided") {
                nav('/');
                return;
            }
            const data = await response.json();
            setGoals(data);
            setLoading(false);
        };
        collect();
    }, [trigger]);

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
                                        <progress value={(goal.completed_tasks.length / goal.tasks.length) * 100} max="100"></progress>
                                    </div>
                            </div>
                            {(goal.completed_tasks.length / goal.tasks.length) == 1 ? <button onClick={() => setCompleteGoal(goal)} className="new-goal-btn">Complete</button> : <button onClick={() => setDeleteGoal(goal)} className="new-goal-btn">Delete</button>}
                        </div>
                    ))
                )}
            </div>
            <Link to="/Homepage" className="home-btn">Home</Link>
            {selectedGoal && (
                <TaskModal goal={selectedGoal} onClose={() => setSelectedGoal(null)} />
            )}
            {deleteGoal && (
                <TaskAction goal={deleteGoal} onClose={() => setDeleteGoal(null)} action="delete" trigger={trigger} setTrigger={setTrigger}/>
            )}
            {completeGoal && (
                <TaskAction goal={completeGoal} onClose={() => setCompleteGoal(null)} action="complete" trigger={trigger} setTrigger={setTrigger}/>
            )}
        </div>
    );
};

export default Goals;
