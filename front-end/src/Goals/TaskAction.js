import React from 'react';
import './TaskModal.css';

const TaskAction = ({ goal, onClose, action, trigger, setTrigger }) => {
    const handleDelete = async () => {
        const token = localStorage.getItem('auth_token'); // Retrieve JWT token

        if (!token) {
            alert("Unauthorized access. Please log in.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/delete/goals/${goal._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include JWT token
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error("Failed to delete the goal");
                const errorData = await response.json();
                alert(errorData.message || "Failed to delete the goal. Please try again.");
                return;
            }

            setTrigger(!trigger); // Trigger a state update to refresh the goals list
            onClose(); // Close the modal
        } catch (error) {
            console.error("Error deleting the goal:", error);
            alert("An error occurred while deleting the goal. Please try again.");
        }
    };

    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2>Are you sure you want to {action} {goal.title}?</h2>
                <button onClick={handleDelete}>Confirm</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default TaskAction;
