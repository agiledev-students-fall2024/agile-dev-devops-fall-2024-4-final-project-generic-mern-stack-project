import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './CreateTask.css';


function EditTask({ tasks, setTasks }) {
    const { taskId } = useParams(); // Get the task ID from the URL
    const taskIndex = parseInt(taskId, 10);  // Convert taskId to a number
    const navigate = useNavigate();
    const task = tasks[taskIndex];

    const [title, setTitle] = useState(task?.name || '');
    const [description, setDescription] = useState(task?.description || '')
    const [subject, setSubject] = useState(task?.subject || '')
    const [due_date, setDue_date] = useState(task?.due || '')
    const [priority, setPriority] = useState(task?.priority ||"Low")
    const [recurring, setRecurring] = useState(task?.recurring ||"No")
    const [error, setError] = useState("")

    const handleTitle = (e) => setTitle(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleSubject = (e) => setSubject(e.target.value)
    const handleDueDate = (e) => setDue_date(e.target.value)
    const handlePriority = (e) => setPriority(e.target.value)
    const handleRecurring = (e) => setRecurring(e.target.value)
 

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTasks = [...tasks];
        updatedTasks[taskId] = { 
            ...task, 
            name: title,
            description: description,
            subject: subject,
            due: due_date,
            priority: priority,
            recurring:recurring };
        setTasks(updatedTasks); // Update the task list
        navigate('/tasks'); // Redirect to the task list
      };

    return (
    <div className="create-task-container">
        <h2>Edit Task</h2>

        <div>
            <h3>Title</h3>
            <input
            type="text"
            value={title}
            onChange={handleTitle}
            placeholder="Input Title Here"
            />
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
                <input type="text" value={due_date} onChange={handleDueDate} placeholder={"Input Due Date Here"}/>
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
        <Link to="/tasks" className="cancel-btn">Cancel</Link>
        <Link type="submit" onClick={handleSubmit} className="create-btn">
            Save
        </Link>       
   
    </div>
    

     
    )


}

export default EditTask;