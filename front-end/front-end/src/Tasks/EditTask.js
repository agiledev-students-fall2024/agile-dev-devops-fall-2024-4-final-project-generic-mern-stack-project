import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './CreateTask.css';
// import axios from 'axios';


function EditTask({ tasks, setTasks }) {
    // const { taskId } = useParams(); 
    // const taskIndex = parseInt(taskId, 10);
    const navigate = useNavigate();

    //Impossible to use fake data for this page since mockaroo randomly generates data instead of storing it
    // Comment for the edit task: because of the restriction of mock data now, 
    // this function cannot fully achieved, so the way we connect it is not exactly true.
    // the page itself can be seen from http://localhost:3000/EditTask.

  /** 
    const [title, setTitle] = useState(task?.name || '');
    const [description, setDescription] = useState(task?.description || '')
    const [subject, setSubject] = useState(task?.subject || '')
    const [due_date, setDue_date] = useState(task?.due || '')
    const [priority, setPriority] = useState(task?.priority ||"Low")
    const [recurring, setRecurring] = useState(task?.recurring ||"No")
    const [recurring_period, setRecurring_period] = useState(task?.recurring_period ||"");
    const [error, setError] = useState("")
 */   

    const handleTitle = (e) => setTitle(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleSubject = (e) => setSubject(e.target.value)
    const handleDueDate = (e) => setDue_date(e.target.value)
    const handlePriority = (e) => setPriority(e.target.value)
    const handleRecurring = (e) => setRecurring(e.target.value)
    const handleRecurringPeriod = (e) => setRecurring_period(e.target.value)

     // Hardcoded task data for sprint 2
     const initialTask = {
        title: "Sample Task",
        description: "This is a sample task description.",
        subject: "Math",
        due_date: "2024-12-01",
        priority: "Medium",
        recurring: "Yes",
        recurring_period: "Weekly",
    }

    // State variables initialized with the hardcoded task data
    const [title, setTitle] = useState(initialTask.title)
    const [description, setDescription] = useState(initialTask.description)
    const [subject, setSubject] = useState(initialTask.subject)
    const [due_date, setDue_date] = useState(initialTask.due_date)
    const [priority, setPriority] = useState(initialTask.priority)
    const [recurring, setRecurring] = useState(initialTask.recurring)
    const [recurringPeriod, setRecurring_period] = useState(initialTask.recurring_period)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !subject || !due_date || !priority || (recurring === "Yes" && !recurringPeriod)) {
            alert("Please fill out all required fields.")
            return
        }
        
        const updatedTask = {
            title,
            description,
            subject,
            due_date,
            priority,
            recurring,
            recurring_period: recurring === "Yes" ? recurringPeriod : "",
        }

        // simulate the "Save" action
        console.log("Updated Task:", updatedTask)
        
        // Redirect to tasks list (simulated)
        navigate('/tasks')


        // This is not harcoded
        // try {
        //     // Send a PUT request to update the task
        //     await axios.put(`http://localhost:5000/tasks/${taskId}`, updatedTask)
        //     // Update local state (optional if using live backend data)
        //     const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, ...updatedTask } : t)
        //     setTasks(updatedTasks);
        //     navigate('/tasks'); // Redirect to tasks list
        // } catch (error) {
        //     console.error("Failed to update task:", error)
        // }
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
                <input  type="date" 
                        value={due_date}
            
                        onChange={handleDueDate}/>
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