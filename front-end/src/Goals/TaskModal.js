import React, { useEffect, useState } from 'react';
import './TaskModal.css';

const TaskModal = ({ goal, onClose }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('auth_token'); // Retrieve JWT token

            if (!token) {
                alert("Unauthorized access. Please log in.");
                onClose(); // Close the modal if unauthorized
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/goals/${goal._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include JWT token
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTasks(data.tasks || []); // Update tasks from the goal data
                } else {
                    console.error("Failed to fetch tasks:", response.statusText);
                    setError("Failed to load tasks. Please try again later.");
                }
            } catch (err) {
                console.error("Error fetching tasks:", err);
                setError("An error occurred while fetching tasks. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [goal, onClose]);

    return (
        <div className="modal-background">
            <div className="modal-content">
                {loading ? (
                    <p>Loading tasks...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <h2>{goal.title}</h2>
                        <h4>Tasks:</h4>
                        <ul>
                            {tasks.map((task, index) => (
                                <li key={index}>
                                    <p>Task: {task.name}</p>
                                    <p>Due Date: {new Date(task.due).toLocaleDateString()}</p>
                                </li>
                            ))}
                        </ul>
                        <button onClick={onClose}>Close</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskModal;
