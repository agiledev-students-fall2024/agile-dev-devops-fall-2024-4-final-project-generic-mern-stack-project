import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useProfile } from './ProfileContext';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';

const EditNote = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { user } = useProfile();
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (state?.note) {
      setTitle(state.note.title);
      setCategory(state.note.category);
      setTags(state.note.tags.join(', '));
      setContent(state.note.content);
    } else {
      fetchNote();
    }
  }, [state, id]);

  const fetchNote = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in again');
        return;
      }
      const res = await axios.get(`http://localhost:${process.env.EXPRESS_SERVER_PORT || 5000}/api/notes/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setTitle(res.data.title);
      setCategory(res.data.category);
      setTags(res.data.tags.join(', '));
      setContent(res.data.content);
    } catch (error) {
      console.error('Error fetching note:', error);
    }
  };

  useEffect(() => {
    if (!quillRef.current) {
      // Remove any existing Quill instances
      const existingEditor = document.querySelector('.ql-container');
      if (existingEditor) {
        existingEditor.remove();
      }

      // Create new Quill instance
      quillRef.current = new Quill(document.getElementById('editor'), {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block'],
          ],
        },
        placeholder: 'Write something...',
      });

      quillRef.current.setText(content);
    }
  }, [content]);

  const handleSave = async () => {
    if (!title || !category || !content) {
      alert('Please fill in all required fields (title, category, and content)');
      return;
    }

    const updatedNote = {
      id,
      user: user?._id,
      title,
      preview: quillRef.current.getText().slice(0, 150) + '...',
      category,
      updatedAt: new Date().toISOString(),
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      author: user?._id,
      content: quillRef.current.root.innerHTML,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in again');
        return;
      }
      await axios.put(`http://localhost:${process.env.EXPRESS_SERVER_PORT || 5000}/api/notes/${id}`, updatedNote, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/existing-notes');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/existing-notes');
  };

  return (
    <section className="note-editor">
      <div className="controls">
        <button className="back-button" type="button" onClick={handleBackClick}>
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
        >
          <option value="">Select Category</option>
          <option value="Programming">Programming</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Management">Management</option>
          <option value="Other">Other</option>
        </select>
        <button className="controls-right" type="button" onClick={handleSave}>
          Save Note
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

      <div id="editor" />
    </section>
  );
};

export default EditNote;