import '../styles/Blogpostloggedin.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogPostLoggedIn = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loggedin, setLoggedin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log('API Response:', response.data); // Debug log
        setPost(response.data.post);
        setLoggedin(response.data.loggedin);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  const imageURL = post.photo;
 
  return (
    <div className="blog-post-container">
      <header className="blog-post-header">
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
          </svg>
        </Link>
      </header>

      <div className="blog-post-content">
        {imageURL ? (
          <img src={imageURL} alt="Post" className="blog-post-image" />
        ) : (
          <img src="https://cdn.vectorstock.com/i/500p/50/20/no-photography-sign-image-vector-23665020.jpg" alt="No Image Provided" className="blog-post-image no-img" />
        )}

        <h1>{post.title}</h1>
        <h3>By {post.name}</h3>
        <br />
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default BlogPostLoggedIn;