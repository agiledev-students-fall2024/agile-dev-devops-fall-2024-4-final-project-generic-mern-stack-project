import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from './ProfileContext';

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

  // Get unique categories from notes
  const categories = ['All', ...new Set(mockNotes.map(note => note.category))];

  // Filter notes based on search term and category
  const filteredNotes = mockNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    const matchesUser = note.author === user?.email;

    return matchesSearch && matchesCategory && matchesUser;
  });

  return (
    <div className="existing-notes-view">
      <div className="notes-header">
        <h1>Your Notes</h1>
        <Link to="/new-note" className="create-button">Create New Note</Link>
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