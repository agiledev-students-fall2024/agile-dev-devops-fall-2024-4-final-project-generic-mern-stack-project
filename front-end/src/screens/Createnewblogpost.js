import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../styles/Createnewblogpost.css';

const apiUrl = process.env.REACT_APP_API_URL;

const CreateBlogPost = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // State for form data
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  // Handle form submissions
  const handlePostBlog = async () => {
    setError(null);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) formData.append('image', image);

      const response = await axios.post(`${apiUrl}/api/posts/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Post created successfully:', response.data);
      navigate(`/profile/${username}`);
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create the post. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="create-blog-post">
      <header className="blog-post-header">
        <Link to={`/profile/${username}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
            />
          </svg>
        </Link>
      </header>

      <h1>New Blog Post</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Upload an Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Post Content</label>
        <textarea
          id="content"
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <button className="post-button" onClick={handlePostBlog}>
        Post Blog
      </button>
    </div>
  );
};

export default CreateBlogPost;
