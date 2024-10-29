import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Tasks.css';

const TASKS_PER_PAGE = 5;

function Tasks({ tasks, setTasks }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    subject: '',
  });
  const [sortAsc, setSortAsc] = useState(true); // New state for sorting

  // Filtered and sorted tasks
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

  // Pagination logic
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

  // Toggle filter visibility
  const toggleFilterVisibility = () => setShowFilters(!showFilters);

  // Toggle sorting order
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
            <button className="edit-btn">
              <Link to={`/edit-task/${index}`}>Edit</Link>
            </button>
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

        <Link to="/CreateTask"><button className="add-task-btn">Add New Task</button></Link>
        <Link to="/" className="home-btn">Home</Link>
      </div>
    </div>
  );
}

export default Tasks;