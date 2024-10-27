import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewGoal.css';
import { Link } from 'react-router-dom';
const NewGoal = () => {
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState(['']);
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    const navigate = useNavigate();

    const handleAddTask = () => {
        setTasks([...tasks, '']);
    };

    const handleTaskChange = (index, value) => {
        const newTasks = [...tasks];
        newTasks[index] = value;
        setTasks(newTasks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newGoal = {
            title,
            tasks: tasks.filter(task => task), // Remove any empty tasks
            dueDate,
            priority,
            completed_tasks: [],
            incomplete_tasks: tasks.filter(task => task), // Start with all tasks as incomplete
        };
        console.log(newGoal); // Replace with logic to save the new goal
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

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div className="tasks-section">
                    <label>Tasks</label>
                    {tasks.map((task, index) => (
                        <div key={index} className="task-input-group">
                            <input
                                type="text"
                                placeholder={`Task ${index + 1}`}
                                value={task}
                                onChange={(e) => handleTaskChange(index, e.target.value)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddTask} className="add-btn">
                        Add Task
                    </button>
                </div>

                <button type="submit" className="submit-btn">Save Goal</button>
            </form>
        </div>
    );
};

export default NewGoal;
