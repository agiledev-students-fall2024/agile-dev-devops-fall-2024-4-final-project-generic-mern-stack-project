import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './CreateTask.css';
import axios from 'axios';

function EditTask() {
    const { taskId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [due, setDue] = useState('');
    const [priority, setPriority] = useState('Low');
    const [recurring, setRecurring] = useState('No');
    const [recurring_period, setRecurring_period] = useState('');
    const [goal, setGoal] = useState('');
    const [status, setStatus] = useState('not_started');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            const token = localStorage.getItem('auth_token'); // Retrieve the token

            if (!token) {
                alert("Unauthorized access. Please log in.");
                navigate('/Login');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:4000/tasks/${taskId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token in the request
                    },
                });
                const task = response.data;

                setName(task.name || '');
                setDescription(task.description || '');
                setSubject(task.subject || '');
                setDue(task.due ? new Date(task.due).toISOString().split('T')[0] : '');
                setPriority(task.priority || 'Low');
                setRecurring(task.recurring || 'No');
                setRecurring_period(task.recurring_period || '');
                setStatus(task.status || 'not_started');
                setGoal(task.goal || '');
            } catch (error) {
                console.error('Error fetching task:', error);
                setError('Failed to load task data.');
                alert('Failed to load task data.');
            }
        };
        if (taskId) fetchTask();
    }, [taskId, navigate]);

    const handleTitle = (e) => setName(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleSubject = (e) => setSubject(e.target.value);
    const handleDueDate = (e) => setDue(e.target.value);
    const handlePriority = (e) => setPriority(e.target.value);
    const handleRecurring = (e) => setRecurring(e.target.value);
    const handleRecurringPeriod = (e) => setRecurring_period(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !subject || !due || !priority || (recurring === "Yes" && !recurring_period)) {
            alert("Please fill out all required fields.");
            return;
        }

        const token = localStorage.getItem('auth_token'); // Retrieve the token

        if (!token) {
            alert("Unauthorized access. Please log in.");
            navigate('/Login');
            return;
        }

        const updatedTask = {
            name,
            description,
            subject,
            due,
            priority,
            recurring,
            recurring_period: recurring === "Yes" ? recurring_period : "",
            goal,
        };

        try {
            const response = await axios.put(`http://localhost:4000/tasks/${taskId}`, updatedTask, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include token in the request
                },
            });
            console.log("Task updated successfully:", response.data);
            alert('Task updated successfully!');
            navigate('/tasks'); // Redirect to the tasks list
        } catch (error) {
            console.error("Failed to update task:", error);
            alert('Failed to update task. Please try again.');
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('auth_token'); // Retrieve the token

        if (!token) {
            alert("Unauthorized access. Please log in.");
            navigate('/Login');
            return;
        }

        try {
            await axios.delete(`http://localhost:4000/tasks/${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include token in the request
                },
            });
            console.log("Task deleted successfully");
            navigate('/tasks'); // Redirect to the tasks list
        } catch (error) {
            console.error("Failed to delete task:", error);
            alert("Failed to delete task. Please try again.");
        }
    };

    return (
        <div className="create-task-container">
            <h2>Edit Task</h2>

            <div>
                <h3>Name</h3>
                <input type="text" value={name} onChange={handleTitle} placeholder="Input Name Here" />
            </div>
            <div>
                <h3>Description</h3>
                <input
                    type="text"
                    value={description}
                    onChange={handleDescription}
                    placeholder="Input Description Here (Optional)"
                />
            </div>
            <div>
                <h3>Subject</h3>
                <input
                    type="text"
                    value={subject}
                    onChange={handleSubject}
                    placeholder="Input Subject Here"
                />
            </div>
            <div>
                <h3>Due Date</h3>
                <input
                    type="date"
                    value={due}
                    onChange={handleDueDate}
                />
            </div>
            <div>
                <h3>Priority</h3>
                <select onChange={handlePriority} value={priority}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div>
                <h3>Recurring</h3>
                <select onChange={handleRecurring} value={recurring}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            {recurring === "Yes" && (
                <div>
                    <h3>Recurring Period</h3>
                    <select value={recurring_period} onChange={handleRecurringPeriod}>
                        <option value="">Select Recurrence</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Biweekly">Biweekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>
            )}
            <br />
            <Link to="/tasks" onClick={handleDelete} className="cancel-btn">
                Delete
            </Link>
            <Link to="/tasks" className="cancel-btn">
                Cancel
            </Link>
            <button type="submit" onClick={handleSubmit} className="create-btn">
                Save
            </button>
        </div>
    );
}

export default EditTask;
