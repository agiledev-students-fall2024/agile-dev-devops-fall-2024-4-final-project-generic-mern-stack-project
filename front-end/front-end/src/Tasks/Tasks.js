import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Tasks.css';
import { useNavigate } from 'react-router-dom';
const TASKS_PER_PAGE = 5;

function Tasks() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [subjects, setSubjects] = useState([]); 
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    subject: '',
  });
  const [sortAsc, setSortAsc] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate()

  useEffect(() => {
    const collect = async () => {
      setLoading(true);
      //const session = window.localStorage.getItem("session_id")
      //this is to retrieve a logged in user's object, if null no user is signed in
      const response = await fetch('http://localhost:4000/tasks');
      const data = await response.json();
      setTasks(data);
      console.log(data)
      const uniqueSubjects = [...new Set(data.map(task => task.subject))];
      setSubjects(uniqueSubjects); // Update subjects state
      setLoading(false);
    };
    collect();
  }, []);

  const filteredTasks = tasks
    .filter(task => 
      (filters.priority === '' || task.priority === filters.priority) &&
      (filters.status === '' || task.status === filters.status) &&
      (filters.subject === '' || task.subject === filters.subject)
    )
    .sort((a, b) => {
      if (!sortAsc) return new Date(b.due) - new Date(a.due);
      return new Date(a.due) - new Date(b.due);
    });

  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
  const indexOfLastTask = currentPage * TASKS_PER_PAGE;
  const indexOfFirstTask = indexOfLastTask - TASKS_PER_PAGE;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    await fetch(`http://localhost:4000/tasks/${taskId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id.$oid === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const toggleStatus = (task, index) => {
    const newStatus = task.status === 'not_started'
      ? 'ongoing'
      : task.status === 'ongoing'
      ? 'finished'
      : 'not_started';
    updateTaskStatus(task.id.$oid, newStatus);
  };


  const getStatusIcon = (status) => {
    if (status === 'finished') return '✓';
    if (status === 'ongoing') return '-';
    return '';
  };
  const handleEdit = (taskId) => {
    // nav('/EditTask/${taskId}');

    //This is modified for sprint 2 only.
    // Impossible to use fake data for this page since mockaroo randomly generates data instead of storing it
    // Comment for the edit task: because of the restriction of mock data now, 
    // this function cannot fully achieved, so the way we connect it is not exactly true.
    // We are directly connecting the edit to http://localhost:3000/EditTask.
     nav('/EditTask');
  };

  const toggleFilterVisibility = () => setShowFilters(!showFilters);
  const toggleSortOrder = () => setSortAsc(!sortAsc);

  return (
    <div className="main-tasks-container">
      <h1 className="tasks-title">Task List</h1>

      <div className="filter-sort-container">
        <button className="filter-btn" onClick={toggleFilterVisibility}>Filter</button>
        <button className="sort-btn" onClick={toggleSortOrder}>
          Sort by Due Date {sortAsc ? '▲' : '▼'}
        </button>
      </div>

      {showFilters && (
        <div className="filter-options">
          <select name="priority" onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
            <option value="">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <select name="status" onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <option value="">All Statuses</option>
            <option value="not_started">Not Started</option>
            <option value="ongoing">Ongoing</option>
            <option value="finished">Finished</option>
          </select>

          <select name="subject" onChange={(e) => setFilters({ ...filters, subject: e.target.value })}>
            <option value="">All Subjects</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>

        </div>
      )}

      <div className="task-list">
        {loading ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          currentTasks.map((task, index) => (
            <div className="task-item" key={index}>
              <input
                type="checkbox"
                checked={task.status === 'finished'}
                readOnly
                onClick={() => toggleStatus(task,index)}
              />
              <span className="status-icon">{getStatusIcon(task.status)}</span>
              <span className="task-name">{task.name}</span>
              <button onClick={() => handleEdit(task.id)} className="edit-btn">Edit</button>
              {/* Comment for the edit task: because of the restriction of mock data now, 
              this function cannot fully achieved, so the way we connect it is not exactly true.
              the page itself can be seen from http://localhost:3000/EditTask. */}
              {/* Sprint2 Comment: Since there's still no way to store the real data with ID, so currently all
               the tasks are connected to the same edit task page*/}
              <span className="due-date">{new Date(task.due).toISOString().split("T")[0]}</span>
            </div>
          ))
        )}

        <div className="pagination">
          <button className='page-btn' onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

        <Link to="/CreateTask" className="home-btn">Add New Task</Link>
        <Link to="/Homepage" className="home-btn">Home</Link>
      </div>
    </div>
  );
}

export default Tasks;
