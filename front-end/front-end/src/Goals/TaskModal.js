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
                        <li key={index}>{task}</li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default TaskModal;