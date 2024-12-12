import React from 'react';
import './TaskModal.css';

const TaskModal = ({ goal, onClose }) => {
    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2>{goal.title}</h2>
                <h4>Tasks:</h4>
                <ul>
                    {goal.tasks.map((task, index) => (
                        <li key={index}>
                            <p>Task: {task.name}</p>
                            <p>Due Date: {new Date(task.due).toLocaleDateString()}</p> {/* Format due date */}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default TaskModal;
