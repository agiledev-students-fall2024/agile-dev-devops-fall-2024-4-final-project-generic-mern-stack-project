import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProfile } from "./ProfileContext";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";

const Delta = Quill.import("delta");

const categoryColors = {
  Programming: "#e8f5e9",
  Mathematics: "#e3f2fd",
  Physics: "#fff3e0",
  Management: "#f3e5f5",
  Other: "#f5f5f5",
};

const categories = [
  "Programming",
  "Mathematics",
  "Physics",
  "Management",
  "Other",
];

const EditNote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useProfile();
  const note = location.state?.note;

  const [title, setTitle] = useState(note?.title || "");
  const [category, setCategory] = useState(note?.category || "");
  const [tags, setTags] = useState(note?.tags.join(", ") || "");
  const [content, setContent] = useState(note?.content || "");
  const [isTyping, setIsTyping] = useState(false);
  const [change, setChange] = useState(new Delta());
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Initialize Quill editor once the note is passed
  useEffect(() => {
    if (note) {
      if (!quillRef.current && editorRef.current) {
        const existingEditor = editorRef.current.querySelector(".ql-container");
        if (existingEditor) {
          existingEditor.remove();
        }

        // Create new Quill instance
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["image", "code-block"],
            ],
          },
          placeholder: "Edit your note...",
        });

        // Set initial content in Quill editor after Quill is initialized
        if (note?.content) {
          quillRef.current.root.innerHTML = note.content;
        }

        quillRef.current.on('text-change', (delta, oldDelta, source) => {
          setChange((prevChange) => prevChange.compose(delta));

          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }

          setIsTyping(true);

          typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
          }, 500); 
        });
      }
    }

    return () => {
      if (quillRef.current) {
        const toolbar = document.querySelector(".ql-toolbar");
        if (toolbar) {
          toolbar.remove();
        }
        quillRef.current = null;
      }
    };
  }, [note]);  // Re-run useEffect only when the note is passed.

  const handleSave = useCallback(async (e) => {
    e.preventDefault();

    if (!title || !category || !quillRef.current) {
      alert("Please fill in all required fields (title, category, and content)");
      return;
    }

    const updatedContent = quillRef.current.root.innerHTML;
    const preview = quillRef.current.getText().slice(0, 150) + "...";

    const updatedNote = {
      id: note.id, // Existing note's ID
      user,
      title,
      preview,
      category,
      updatedAt: new Date().toISOString(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      author: user?._id,
      content: updatedContent,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in again.");
        return;
      }

      await axios.put(
        `https://easynote-aivlj.ondigitalocean.app/api/notes/${note.id}`,
        updatedNote,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      alert("Note updated successfully.");
      navigate(`/view-note/${note.id}`);
    } catch (error) {
      console.error("Error updating note:", error);
      alert("Failed to update the note.");
    }
  }, [title, category, tags, note, user]);

  const handleBackClick = () => {
    navigate(`/view-note/${note.id}`);
  };

  return (
    <section className="edit-note-view">
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
            style={{
              backgroundColor: category ? categoryColors[category] : "#fff",
            }}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
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

        <div className="note-actions">
          <button className="save-button" onClick={handleSave}>
            Save Note
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditNote;
