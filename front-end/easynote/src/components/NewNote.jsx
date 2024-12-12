import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "./ProfileContext";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback } from "react";
import axios from "axios";

const Delta = Quill.import("delta");

// Category colors mapping
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

const Summary = ({ displaySummary, summaryContent }) => {
  if (displaySummary) {
    return (
      <>
        <div className="summary">
        <h2>Connecting to AI summarizer...</h2>
         <p>{summaryContent}</p>
        </div>
      </>
    )
  }
  return null;
};

const NewNote = () => {
  const [displaySummary, setDisplaySummary] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const { user } = useProfile();
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [change, setChange] = useState(new Delta());
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null); 
  const changeRef = useRef(new Delta());
  const [summary, setSummary] = useState(null);

  async function triggerAPI(notes) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in again');
        return;
      }
  
      const res = await axios.post(
        `https://easynote-aivlj.ondigitalocean.app/api/notes/`,
        notes,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Success", res);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.message || "Unknown error";
      // alert(`Failed to save note: ${errorMessage}`);
      console.error("Error occurred:", error);
      // throw error; // Re-throw for tests to catch
    }
  }

  // how to get the summary from the user's notes
  // what info should be sent to what route
  async function generateSummary(){
    // /summarize
    const content = quillRef.current.root.textContent;
    // console.log('content', content);
    try{
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in again');
        return;
      }
      const url = `https://easynote-aivlj.ondigitalocean.app/api/aiFeaturesRoute/summarize/`;
      // const url =  `http://localhost:${process.env.EXPRESS_SERVER_PORT || 5000}/api/aiFeaturesRoute/summarize`; local version
      const res = await axios.post(
        url,
        { 'text': content },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDisplaySummary(true);
      setSummary(res.data.summary);
      return res.data.summary;
      // const data = await res.json();
    }
    catch(e){
      // console.log(content);
      console.error("Error occurred:", e);
      // throw e;
    }
  }


  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      // Remove any existing Quill instances
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
        placeholder: "Write something...",
      });

    quillRef.current.on('text-change', (delta, oldDelta, source) => {
      console.log("Delta (change made):", delta);
      console.log("Old Delta:", oldDelta);
      console.log("Source of change:", source);
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
    
const saveInterval = setInterval(() => {
  if (change.length() > 0) {
    console.log('Saving changes', change);

    const content = {content: quillRef.current.root.textContent};

    triggerAPI(content)
    
    changeRef.current = new Delta();
    console.log('Changes reset after save');
  }
}, 5000); 



    return () => {
      if (quillRef.current) {
        const toolbar = document.querySelector(".ql-toolbar");
        if (toolbar) {
          toolbar.remove();
        }
        quillRef.current = null;
      }
      clearInterval(saveInterval);
      window.onbeforeunload = null;
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current); // Clear typing timeout
      }
    };
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
    if (!title || !category || !quillRef.current) {
      alert(
        "Please fill in all required fields (title, category, and content)"
      );
      return;
    }

    const content = quillRef.current.root.textContent;
    const preview = quillRef.current.getText().slice(0, 150) + "...";

    const newNote = {
      id: Date.now(), // In production, this would come from the backend
      user,
      title,
      preview,
      category,
      updatedAt: new Date().toISOString(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
        author: user && user._id,
      // author: user?._id,
      // author: user?.email,
      content,
    };

    console.log("NewNote:", newNote);
    handleSubmit(e, newNote);

    // In production, this would be an API call
    console.log("Saving note:", newNote);
    navigate("/existing-notes");
  };

  const handleBackClick = () => {
    if (quillRef.current) {
      const toolbar = document.querySelector(".ql-toolbar");
      if (toolbar) {
        toolbar.remove();
      }
      quillRef.current = null;
    }
    navigate("/");
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
          <button
            className="controls-right"
            type="button"
            onClick={generateSummary}
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
        <Summary displaySummary={displaySummary} summaryContent={summary} />

        <div className="note-actions">
          <button className="save-button" onClick={handleSave}>
            Save Note
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewNote;
