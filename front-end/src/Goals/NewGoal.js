import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './NewGoal.css';

const NewGoal = () => {
    const [title, setTitle] = useState('');
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showTaskList, setShowTaskList] = useState(false);
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('auth_token'); // Retrieve JWT token

            if (!token) {
                alert("Unauthorized access. Please log in.");
                navigate('/Login'); // Redirect to login if token is missing
                return;
            }

            try {
                const response = await fetch('http://localhost:4000/tasks', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include JWT token
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTasks(data);
                } else {
                    console.error("Failed to fetch tasks:", response.statusText);
                    alert("Failed to fetch tasks. Please log in again.");
                    localStorage.removeItem('auth_token');
                    navigate('/Login');
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
                alert("An error occurred while fetching tasks. Please try again.");
            }
        };

        fetchTasks();
    }, [navigate]);

    const toggleTaskList = () => {
        setShowTaskList((prevShow) => !prevShow);
    };

    const handleTaskSelection = (taskId) => {
        setSelectedTasks((prevSelectedTasks) =>
            prevSelectedTasks.includes(taskId)
                ? prevSelectedTasks.filter((id) => id !== taskId)
                : [...prevSelectedTasks, taskId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('auth_token'); // Retrieve JWT token

        if (!token) {
            alert("Unauthorized access. Please log in.");
            navigate('/Login'); // Redirect to login if token is missing
            return;
        }

        const newGoal = { title, tasks: selectedTasks, dueDate };

        try {
            const response = await fetch('http://localhost:4000/goals/new', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include JWT token
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGoal),
            });

            if (response.ok) {
                navigate('/Goals');
            } else {
                const errorData = await response.json();
                console.error("Failed to create goal:", errorData.message);
                alert(errorData.message || "Failed to create goal. Please try again.");
            }
        } catch (error) {
            console.error("Error creating goal:", error);
            alert("An error occurred while creating the goal. Please try again.");
        }
    };

    return (
        <div className="new-goal-container">
            <h1 className="page-title">Create New Goal</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Goal Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        type="date"
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
                            {tasks.map((task) => (
                                <div key={task._id} className="task-item">
                                    <input
                                        type="checkbox"
                                        checked={selectedTasks.includes(task._id)}
                                        onChange={() => handleTaskSelection(task._id)}
                                    />
                                    <span>{task.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="new-goal-buttons">
                    <Link to="/Goals">
                        <button type="button" className="cancel-btn">Cancel</button>
                    </Link>
                    <button type="submit" className="create-btn">Save Goal</button>
                </div>
            </form>
        </div>
    );
};

export default NewGoal;
