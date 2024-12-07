import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from './ProfileContext';
import axios from "axios";



// Mock data 
const mockNotes = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    preview: "React Hooks are functions that allow you to use state and other React features in functional components...",
    category: "Programming",
    lastModified: "2024-10-25T14:48:00",
    tags: ["react", "javascript", "web development"],
    author: "john.doe@email.com"
  },
  {
    id: 2,
    title: "Linear Algebra Notes - Matrices",
    preview: "A matrix is a rectangular array of numbers, symbols, or expressions arranged in rows and columns...",
    category: "Mathematics",
    lastModified: "2024-10-24T09:30:00",
    tags: ["math", "linear algebra", "matrices"],
    author: "john.doe@email.com"
  },
  {
    id: 3,
    title: "Physics - Quantum Mechanics",
    preview: "Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties...",
    category: "Physics",
    lastModified: "2024-10-23T16:20:00",
    tags: ["physics", "quantum", "science"],
    author: "john.doe@email.com"
  },
  {
    id: 4,
    title: "Project Management Best Practices",
    preview: "Effective project management requires careful planning, clear communication, and adaptive problem-solving...",
    category: "Management",
    lastModified: "2024-10-22T11:15:00",
    tags: ["management", "leadership", "organization"],
    author: "john.doe@email.com"
  },
  {
    id: 5,
    title: "Data Structures - Binary Trees",
    preview: "A binary tree is a tree data structure in which each node has at most two children, referred to as left child and right child...",
    category: "Programming",
    lastModified: "2024-10-21T13:45:00",
    tags: ["algorithms", "data structures", "programming"],
    author: "john.doe@email.com"
  }
];

const ExistingNotes = () => {
  const { user } = useProfile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedNotes, setSelectedNotes] = useState([]);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`http://backend:5000/api/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
      })
      .then(data => {
        setNotes(data); 
        console.log('Notes:', data);
      })
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  // Get unique categories from notes
  const categories = ['All', ...new Set(notes.map(note => note.category))];


  // Filter notes based on search term and category
const filteredNotes = notes.filter(note => {
  const matchesSearch = note.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
                       note.preview.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
                       note.tags.some(tag => tag.toLowerCase().includes(searchTerm.trim().toLowerCase()));
  const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
  const matchesUser = true; //note.author === user?.email;

  return (matchesSearch && matchesCategory && matchesUser) ? note : "";
});

 // Handle checkbox toggle
 const handleCheckboxToggle = (id) => {
  setSelectedNotes(prevSelected =>
    prevSelected.includes(id)
      ? prevSelected.filter(noteId => noteId !== id)
      : [...prevSelected, id]
  );
};
// Handle delete action
const handleDelete = async (noteId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this note? This action cannot be undone."
    );

    if (isConfirmed) {
      try {
        // Remove the note from the database
        const token = localStorage.getItem("token");  // Make sure user is authenticated
        if (!token) {
          alert("Please log in again.");
          return;
        }

        await axios.delete(
          `http://localhost:${process.env.EXPRESS_SERVER_PORT || 5000}/api/notes/${noteId}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        // After successful deletion, remove the note from the state
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));

        alert("Note deleted successfully.");
      } catch (error) {
        console.error("Error deleting note:", error);
        alert("Failed to delete the note.");
      }
    }
  };

const handleEditNote = () => {
  if (selectedNotes.length === 1) {
    const noteToEdit = mockNotes.find(note => note.id === selectedNotes[0]);
    navigate('/new-note', { state: { note: noteToEdit } });
  } else {
    alert("Please select exactly one note to edit.");
  }
};
const handleOpenNote = () => {
  if (selectedNotes.length === 1) {
    const noteToView = mockNotes.find(note => note.id === selectedNotes[0]);
    navigate('/view-note', { state: { note: noteToView } });
  } else {
    alert("Please select exactly one note to open.");
  }
};

return (
  <div className="existing-notes-view">
    <div className="notes-header">
      <h1>Your Notes</h1>
      <Link to="/new-note" className="create-button">Create New Note</Link>
      {selectedNotes.length > 0 && (
        <>
          <button className="open-button" onClick={handleOpenNote} >Open Note</button>
          <button className="edit-button" onClick={handleEditNote} >Edit Note</button>
          <button className="delete-button" onClick={handleDelete}>Delete Note</button>
        </>
      )}
    </div>

    <div className="notes-filters">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-select"
      >
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>

    <div className="notes-grid">
      {filteredNotes.map(note => (
        <div key={note.id} className="note-card">
          <input
            type="checkbox"
            className="note-checkbox"
            checked={selectedNotes.includes(note.id)}
            onChange={() => handleCheckboxToggle(note.id)}
          />
          <div className="note-card-header">
            <span className="note-category">{note.category}</span>
            <span className="note-date">
              {new Date(note.lastModified).toLocaleDateString()}
            </span>
          </div>
          <h3 className="note-title">{note.title}</h3>
          <p className="note-preview">{note.preview}</p>
          <div className="note-tags">
            {note.tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
      {filteredNotes.length === 0 && (
        <div className="no-notes">
          <p>No notes found. Try adjusting your search or create a new note.</p>
        </div>
      )}
    </div>
  </div>
);
};

export default ExistingNotes;