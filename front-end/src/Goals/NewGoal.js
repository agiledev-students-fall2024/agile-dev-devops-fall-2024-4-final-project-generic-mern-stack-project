import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewGoal.css';
import { Link } from 'react-router-dom';
const NewGoal = () => {
    const [title, setTitle] = useState('');
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [tasks, setTasks] = useState(['']);
    const [showTaskList, setShowTaskList] = useState(false);
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();

    const availableTasks = [
        'Read Algorithms Notes',
        'Complete React Project',
        'Prepare for Math Exam',
        'Write Report on Ethics',
        'Finish SDE Homework'
    ];

    const toggleTaskList = () => {
        setShowTaskList((prevShow) => !prevShow);
    };
    //call actual tasks for this user and display them here and return
    //mongoDB uuid in the array of selected tasks
    const handleTaskSelection = (task) => {
        setSelectedTasks((prevSelectedTasks) =>
            prevSelectedTasks.includes(task)
                ? prevSelectedTasks.filter((t) => t !== task)
                : [...prevSelectedTasks, task]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newGoal = {
            title,
            tasks: selectedTasks,
            dueDate,
            completed_tasks: [],
            incomplete_tasks: selectedTasks
        };
        console.log(newGoal); // Replace with logic to save the new goal
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, tasks: selectedTasks, dueDate })
        };
        let response = await fetch('http://localhost:4000/goals/new', reqOptions);
        response = await response.json(); 
        console.log(response);
        navigate('/Goals');
    };

    return (
        <div className="new-goal-container">
            <h1 className="page-title">Create New Goal</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Goal Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>


                <div className="tasks-section">
                    <button type="button" onClick={toggleTaskList} className="task-select-btn">
                        Select from Existing Tasks
                    </button>
                    {showTaskList && (
                        <div className="task-list-dropdown">
                            {availableTasks.map((task, index) => (
                                <div key={index} className="task-item">
                                    <input
                                        type="checkbox"
                                        checked={selectedTasks.includes(task)}
                                        onChange={() => handleTaskSelection(task)}
                                    />
                                    <span>{task}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="new-goal-buttons">
                    <Link to="/Goals">
                        <button className="cancel-btn">Cancel</button>
                    </Link>
                    <button type="submit" className="create-btn">Save Goal</button>
                </div>
            </form>
        </div>
    );
};

export default NewGoal;
