import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Tasks.css';

const TASKS_PER_PAGE = 5; // Number of tasks per page

function Tasks() {
  const [tasks, setTasks] = useState([
    { name: 'Read Algorithms Notes', due: '11/23', status: 'finished' },
    { name: 'Read SDE Notes', due: '11/25', status: 'ongoing' },
    { name: 'Read Ethics Notes', due: '11/24', status: 'not_started' },
    { name: 'Complete React Project', due: '11/26', status: 'not_started' },
    { name: 'Study for Math Exam', due: '11/27', status: 'ongoing' },
    { name: 'Prepare Presentation', due: '11/28', status: 'ongoing' },
    { name: 'Write Blog Post', due: '11/29', status: 'finished' },
    { name: 'Finish Machine Learning Assignment', due: '12/01', status: 'not_started' },
    { name: 'Start Gym Routine', due: '12/02', status: 'ongoing' },
    { name: 'Read Ethics Paper', due: '12/03', status: 'not_started' }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);  // State to toggle filter visibility
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    subject: '',
  });

  // Pagination logic
  const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE);
  const indexOfLastTask = currentPage * TASKS_PER_PAGE;
  const indexOfFirstTask = indexOfLastTask - TASKS_PER_PAGE;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Toggle task status
  const toggleStatus = (index) => {
    const taskIndex = (currentPage - 1) * TASKS_PER_PAGE + index;
    setTasks(tasks.map((task, i) => {
      if (i === taskIndex) {
        if (task.status === 'not_started') {
          return { ...task, status: 'ongoing' };
        } else if (task.status === 'ongoing') {
          return { ...task, status: 'finished' };
        } else {
          return { ...task, status: 'not_started' };
        }
      }
      return task;
    }));
  };

  const getStatusIcon = (status) => {
    if (status === 'finished') return '✓';
    if (status === 'ongoing') return '–';
    return '';
  };

  // Handle filter visibility toggle
  const toggleFilterVisibility = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="main-tasks-container">
      <h1 className="tasks-title">Task List</h1>

      <div className="filter-sort-container">
        <button className="filter-btn" onClick={toggleFilterVisibility}>Filter</button>
        <button className="sort-btn">Sort by Due Date</button>
      </div>

      {/* Filters */}
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
            <option value="algorithms">Algorithms</option>
            <option value="software engineering">Software Engineering</option>
            <option value="ethics">Ethics</option>
          </select>
        </div>
      )}

      {/* Task List */}
      <div className="task-list">
        {currentTasks.map((task, index) => (
          <div className="task-item" key={index}>
            <input
              type="checkbox"
              checked={task.status === 'finished'}
              readOnly
              onClick={() => toggleStatus(index)}
            />
            <span className="status-icon">{getStatusIcon(task.status)}</span>
            <span className="task-name">{task.name}</span>
            <button className="edit-btn">Edit</button>
            <span className="due-date">{task.due}</span>
          </div>
        ))}

        {/* Pagination */}
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

        <Link to="/CreateTask" className="add-task-btn">Add New Task</Link>
        <Link to="/" className="home-btn">Home</Link>
      </div>
    </div>
  );
}

export default Tasks;