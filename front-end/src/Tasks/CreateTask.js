import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateTask.css';

function CreateTask() {
    const nav = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("");
    const [due_date, setDue_date] = useState("");
    const [priority, setPriority] = useState("Low");
    const [recurring, setRecurring] = useState("No");
    const [recurringPeriod, setRecurringPeriod] = useState("");

    const handleTitle = (e) => setTitle(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleSubject = (e) => setSubject(e.target.value);
    const handleDue_date = (e) => setDue_date(e.target.value);
    const handlePriority = (e) => setPriority(e.target.value);
    const handleRecurring = (e) => setRecurring(e.target.value);
    const handleRecurringPeriod = (e) => setRecurringPeriod(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !subject || !due_date || !priority || (recurring === "Yes" && !recurringPeriod)) {
            alert("Please fill out all required fields.");
            return;
        }

        const token = localStorage.getItem("auth_token"); // Retrieve token
        if (!token) {
            alert("Unauthorized access. Please log in.");
            nav('/Login');
            return;
        }

        const newTask = {
            title,
            description,
            subject,
            due_date,
            priority,
            recurring,
            recurring_period: recurring === "Yes" ? recurringPeriod : "",
        };

        try {
            const response = await fetch('http://localhost:4000/tasks', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include JWT token
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                nav("/Tasks");
            } else {
                const error = await response.json();
                console.error("Failed to create task:", error);
                alert(error.message || "Failed to create task. Please try again.");
            }
        } catch (error) {
            console.error('Error creating task:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="create-task-container">
            <div>
                <h3>Title</h3>
                <input type="text" value={title} onChange={handleTitle} placeholder="Input Title Here" />
            </div>
            <div>
                <h3>Description</h3>
                <input type="text" value={description} onChange={handleDescription} placeholder="Input Description Here (Optional)" />
            </div>
            <div>
                <h3>Subject</h3>
                <input type="text" value={subject} onChange={handleSubject} placeholder="Input Subject Here" />
            </div>
            <div>
                <h3>Due Date</h3>
                <input type="date" value={due_date} onChange={handleDue_date} />
            </div>
            <div>
                <h3>Priority</h3>
                <select onChange={handlePriority} value={priority}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
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
                    <select value={recurringPeriod} onChange={handleRecurringPeriod}>
                        <option value="">Select Recurrence</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Biweekly">Biweekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>
            )}
            <div className="create-task-buttons">
                <Link to="/Tasks">
                    <button className="cancel-btn">Cancel</button>
                </Link>
                <button type="submit" onClick={handleSubmit} className="create-btn">Create Task</button>
            </div>
        </div>
    );
}

export default CreateTask;
