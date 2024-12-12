import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        const fetchTasks = async () => {
            const user = await JSON.parse(window.localStorage.getItem('session_user'))
            const token = window.localStorage.getItem('token')
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/task/${user?._id}`,{
                headers: { 'Content-Type': 'application/json', 'Authorization': token } 
            });
            if (response.status === 401 || response.error === "Invalid token" || response.error === "No token provided") {
                navigate('/');
                return;
            }
            const data = await response.json();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    const toggleTaskList = () => {
        setShowTaskList((prevShow) => !prevShow);
    };
    //call actual tasks for this user and display them here and return
    //mongoDB uuid in the array of selected tasks
    const handleTaskSelection = (taskId) => {
        setSelectedTasks((prevSelectedTasks) =>
            prevSelectedTasks.includes(taskId)
                ? prevSelectedTasks.filter((id) => id !== taskId)
                : [...prevSelectedTasks, taskId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //window.localStorage.getItem('session_user')
        const user = await JSON.parse(window.localStorage.getItem('session_user'))
        const token = window.localStorage.getItem('token')
        const newGoal = { title, tasks: selectedTasks, dueDate, "user_id": user._id };
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/goals/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': token
             },
            body: JSON.stringify(newGoal),
        })
        if (response.status === 401 || response.error === "Invalid token" || response.error === "No token provided") {
            navigate('/');
            return;
        }
        if (response.ok) navigate('/Goals');
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
                        <button className="cancel-btn">Cancel</button>
                    </Link>
                    <button type="submit" className="create-btn">Save Goal</button>
                </div>
            </form>
        </div>
    );
};

export default NewGoal;
