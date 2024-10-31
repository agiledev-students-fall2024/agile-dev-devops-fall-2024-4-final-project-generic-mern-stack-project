import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './CreateTask.css';


function EditTask({ tasks, setTasks }) {
    const { taskId } = useParams(); 
    const taskIndex = parseInt(taskId, 10);
    const navigate = useNavigate();
    // const task = tasks[taskIndex];
    const task = tasks?.find(task => task.id === taskIndex);
    //Impossible to use fake data for this page since mockaroo randomly generates data instead of storing it
    // Comment for the edit task: because of the restriction of mock data now, 
    // this function cannot fully achieved, so the way we connect it is not exactly true.
    // the page itself can be seen from http://localhost:3000/EditTask.
    const [title, setTitle] = useState(task?.name || '');
    const [description, setDescription] = useState(task?.description || '')
    const [subject, setSubject] = useState(task?.subject || '')
    const [due_date, setDue_date] = useState(task?.due || '')
    const [priority, setPriority] = useState(task?.priority ||"Low")
    const [recurring, setRecurring] = useState(task?.recurring ||"No")
    const [recurring_period, setRecurring_period] = useState(task?.recurring_period ||"");
    const [error, setError] = useState("")
    

    const handleTitle = (e) => setTitle(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleSubject = (e) => setSubject(e.target.value)
    const handleDueDate = (e) => setDue_date(e.target.value)
    const handlePriority = (e) => setPriority(e.target.value)
    const handleRecurring = (e) => setRecurring(e.target.value)
    const handleRecurringPeriod = (e) => setRecurring_period(e.target.value)
 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !subject || !due_date || !priority || (recurring === "Yes" && !recurring_period)) {
            alert("Please fill out all required fields.");
            return;
        }
        const updatedTasks = [...tasks];
        updatedTasks[taskId] = { 
            ...task, 
            name: title,
            description: description,
            subject: subject,
            due: due_date,
            priority: priority,
            recurring:recurring,
            recurring_period: recurring_period
         };
        setTasks(updatedTasks); // Update the task list
        navigate('/tasks'); // Redirect to the task list
      }
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
                <input type="text" value={description} onChange={handleDescription} placeholder={"Input Description Here (Optional)"}/>
            </div>
            <div>
                <h3>Subject</h3>
                <input type="text" value={subject} onChange={handleSubject} placeholder={"Input Subject Here"}/>
            </div>
            <div>
                <h3>Due Date</h3>
                <input type="date" onChange={handleDueDate}/>
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
                    <select value={recurring_period} onChange={handleRecurringPeriod}>
                        <option value="">Select Recurrence</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Biweekly">Biweekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Bimonthly">Bimonthly</option>
                    </select>
                </div>
            )}   
        <br></br>
        {/*Delete Button*/}    
        <Link to="/tasks" className="cancel-btn">Delete</Link>     
        <Link to="/tasks" className="cancel-btn">Cancel</Link>
        <Link type="submit" onClick={handleSubmit} className="create-btn">
            Save
        </Link>  
   
    </div>
    

     
    )


}

export default EditTask;