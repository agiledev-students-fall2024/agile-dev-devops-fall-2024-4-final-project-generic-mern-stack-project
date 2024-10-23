import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        <div>
            <h1>Goals</h1>
            <Link to="/CreateGoal">New</Link>
            {/* Consider adding a maximum goal count*/}
            <ul>
                {
                    goals.map((goal) => {
                        return (
                            <li>
                                <h3>{goal.title}</h3>
                                <p>Due Date: {goal.due_date}</p>
                                <h3>{`${goal.completed_tasks.length} / ${goal.tasks.length}`}</h3>
                                <progress value={`${(goal.completed_tasks.length / goal.tasks.length) * 100}`} max="100"></progress>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Goals;