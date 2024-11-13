import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from './ProfileContext';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useCallback } from 'react';
import axios from 'axios';

const Delta = Quill.import('delta');

// Category colors mapping
const categoryColors = {
  'Programming': '#e8f5e9',
  'Mathematics': '#e3f2fd',
  'Physics': '#fff3e0',
  'Management': '#f3e5f5',
  'Other': '#f5f5f5'
};

const categories = ['Programming', 'Mathematics', 'Physics', 'Management', 'Other'];

const Summary = ({ displaySummary }) => {
  if (displaySummary) {
    return (
      <div className="summary">
        Connecting to AI summarizer...
      </div>
    );
  }
  return null;
};

const NewNote = () => {
  const [displaySummary, setDisplaySummary] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const { user } = useProfile();
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      // Remove any existing Quill instances
      const existingEditor = editorRef.current.querySelector('.ql-container');
      if (existingEditor) {
        existingEditor.remove();
      }
      
      // Create new Quill instance
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
          ]
        },
        placeholder: 'Write something...',
      });
    }

    return () => {
      if (quillRef.current) {
        const toolbar = document.querySelector('.ql-toolbar');
        if (toolbar) {
          toolbar.remove();
        }
        quillRef.current = null;
      }
    };
  }, []);


  const triggerAPI = useCallback(async (notes) => {
    try {
      const res = await axios.post(`http://localhost:${process.env.EXPRESS_SERVER_PORT || 5000}/api/notes/`, notes);
      console.log('Success', res);
    } catch (error) {
      console.error('Error occurred:', error); 
    }
  }, []);

  // function that will call triggerAPI
  // function will be called when user clicks on saveButton
  const handleSubmit = useCallback(
    (e, notes) => {
      e.preventDefault();
      triggerAPI(notes);
    },
    [triggerAPI]
  );

  const handleSave = (e) => {

  const handleSave = () => {
    if (!title || !category || !quillRef.current) {
      alert('Please fill in all required fields (title, category, and content)');
      return;
    }

    const content = quillRef.current.root.innerHTML;
    const preview = quillRef.current.getText().slice(0, 150) + '...';

    const newNote = {
      id: Date.now(), // In production, this would come from the backend
      user,
      title,
      preview,
      category,
      updatedAt: new Date().toISOString(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      author: user?._id,
      content
    };

    // This line assumes handleSubmit requires an event 'e' and the 'newNote' object
    handleSubmit(null, newNote);

    // In production, this would be an API call
    console.log('Saving note:', newNote);
    navigate('/existing-notes');
  };

  const handleBackClick = () => {
    if (quillRef.current) {
      const toolbar = document.querySelector('.ql-toolbar');
      if (toolbar) {
        toolbar.remove();
      }
      quillRef.current = null;
    }
    navigate('/');
  };

  return (
    <section className="new-note-view">
      <div className="main">
        <div className="controls">
          <button
            className="back-button"
            type="button"
            onClick={handleBackClick}
          >
            ← Back
          </button>
          <input
            className="title"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ backgroundColor: category ? categoryColors[category] : '#fff' }}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            className="controls-right"
            type="button"
            onClick={() => setDisplaySummary(true)}
          >
            Summarize
          </button>
        </div>

        <div className="tags-input-container">
          <input
            type="text"
            className="tags-input"
            placeholder="Add tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div ref={editorRef} className="editor-container" />
        <Summary displaySummary={displaySummary} />
        
        <div className="note-actions">
          <button
            className="save-button"
            onClick={handleSave}
          >
            Save Note
          </button>
        </div>
      </div>
    </section>
  );
};
}

export default NewNote;