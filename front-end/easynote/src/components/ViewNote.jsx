import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const tagColors = {
  "React": "#e8f5e9", 
  "JavaScript": "#e3f2fd", 
  "Python": "#fff3e0", 
  "CSS": "#f3e5f5", 
  "HTML": "#f5f5f5", 
  "Other": "#f0f0f0", 
};

const ViewNote = () => {
  const location = useLocation();
  const note = location.state?.note;

  if (!note) {
    return <p>No note selected for viewing.</p>;
  }

  return (
    <div className="view-note">
      <h1>{note.title}</h1>
      <p><strong>Category:</strong> {note.category}</p>
      <p><strong>Last Modified:</strong> {new Date(note.updatedAt).toLocaleString()}</p>
      <div className="note-tags">
        <strong>Tags:</strong> 
        {note.tags && note.tags.length > 0 ? (
          note.tags.map(tag => (
            <span 
              key={tag} 
              className="tag" 
              style={{ backgroundColor: tagColors[tag] || tagColors['Other'] }}
            >
              {tag}
            </span>
          ))
        ) : (
          <span>No tags</span>
        )}
      </div>
      <p>{note.content}</p> {/* Changed from preview to content */}
      <Link to="/">Back to Notes</Link>
    </div>
  );
};

export default ViewNote;