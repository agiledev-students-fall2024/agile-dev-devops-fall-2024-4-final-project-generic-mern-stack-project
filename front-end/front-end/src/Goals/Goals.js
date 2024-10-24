import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Goals.css"
const Goals = () => {
    const [goals, setGoals] = useState([
        {
            title: "Goal 1",
            tasks: ["Task 1", "Task 2", "Task 3"],
            completed_tasks: ["Task 1"],
            incomplete_tasks: ["Task 2"],
            due_date: "XX/XX/XXXX",
        },
        {
            title: "Goal 2",
            tasks: ["Task 1", "Task 2"],
            completed_tasks: ["Task 1"],
            incomplete_tasks: ["Task 2"],
            due_date: "XX/XX/XXXX",
        },
        {
            title: "Goal 3",
            tasks: ["Task 1", "Task 2"],
            completed_tasks: ["Task 1"],
            incomplete_tasks: ["Task 2"],
            due_date: "XX/XX/XXXX",
        }
    ])
    return (
        <div className="container">
            <h1 className="page-title">Goals</h1>
            <Link to="/CreateGoal" className="new-goal-btn">New</Link>
            <div className="goals-list">
                {
                    goals.map((goal) => {
                        return (
                            <div className="goal-item" key={goal.title}>
                                <h3>{goal.title}</h3>
                                <p>Due Date: {goal.due_date}</p>
                                <div className="progress-container">
                                    <p>{`${goal.completed_tasks.length} / ${goal.tasks.length}`}</p>
                                    <progress value={`${(goal.completed_tasks.length / goal.tasks.length) * 100}`} max="100"></progress>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Link to="/" className="home-btn">Home</Link>
        </div>
    )
}
export default Goals;