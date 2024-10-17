import React, { useState } from 'react';
import './CreateBlogPost.css';

const CreateBlogPost = () => {
  // State for form data
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  // Handle form submissions
  const handlePostBlog = () => {
    console.log('Post blog:', { title, content, image });
  };

  // Handle file input
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="create-blog-post">
      <h1>New Blog Post</h1>

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

      <button className="post-button" onClick={handlePostBlog}>Post Blog</button>
    </div>
  );
};

export default CreateBlogPost;


