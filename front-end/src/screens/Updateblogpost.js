import React, { useState } from 'react';
import '../styles/Updateblogpost.css';

const Updateblogpost = () => {
  const [title, setTitle] = useState('Best Restaurants in NYC');
  const [content, setContent] = useState(
    "New York City, a bustling metropolis renowned for its vibrant culture, iconic skyline, and, most importantly, its diverse culinary landscape, offers an endless array of dining experiences. From the historic eateries of Lower Manhattan to the innovative kitchens sprouting up in Brooklyn, every borough presents a unique taste and ambiance. Whether you're a foodie in search of cutting-edge gastronomic trends or someone craving the comfort of traditional dishes, NYC's restaurant scene has something to offer everyone.\n\nFor those who cherish history as much as a good meal, classic establishments like Katz's Delicatessen in Manhattan are a must-visit. Operating since 1888, Katz's serves up arguably the best pastrami sandwich in the city."
  );
  const [image, setImage] = useState(null);

  // Handle form submissions
  const handleUpdateBlog = () => {
    console.log('Update blog:', { title, content, image });
  };

  // Handle file input
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="update-blog-post">
      <header className="update-blog-post-header">
        <button className="back-button">&#8592; Edit Blog Post</button>
        <button className="update-button" onClick={handleUpdateBlog}>Update Blog Post</button>
      </header>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Upload New Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Edit Post Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Updateblogpost;
