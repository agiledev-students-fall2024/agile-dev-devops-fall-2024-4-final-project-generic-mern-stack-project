import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CreateTask.css';


function CreateTask() {
    const [task, setTask] = useState({
        title: "",
        description: "",
        subject: "",
        due_date: "",
        priority: "",
        recurring: ""
    })

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [subject, setSubject] = useState("")
    const [due_date, setDue_date] = useState("")
    const [priority, setPriority] = useState("Low")
    const [recurring, setRecurring] = useState("No")
    const [error, setError] = useState("")

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleSubject = (e) => {
        setSubject(e.target.value)
    }

    const handleDue_date = (e) => {
        setDue_date(e.target.value)
    }

    const handlePriority = (e) => {
        setPriority(e.target.value)
    }

    const handleRecurring = (e) => {
        setRecurring(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="create-task-container">
            <div>
                <h3>Title</h3>
                <input type="text" value={title} onChange={handleTitle} placeholder={"Input Title Here"}/>
            </div>
            <div>
                <h3>Description</h3>
                <input type="text" value={description} onChange={handleDescription} placeholder={"Input Description Here"}/>
            </div>
            <div>
                <h3>Subject</h3>
                <input type="text" value={subject} onChange={handleSubject} placeholder={"Input Subject Here"}/>
            </div>
            <div>
                <h3>Due Date</h3>
                <input type="text" value={due_date} onChange={handleDue_date} placeholder={"Input Due Date Here"}/>
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
            <br></br>
            <Link to="/Tasks" className="cancel-btn">Cancel</Link>
            <Link to="/Tasks" className="create-btn">Create Task</Link>
        </div>
    )


}

export default CreateTask;