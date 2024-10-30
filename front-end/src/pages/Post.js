//Post page is for the blog icon in nav bar in wireframe
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostBlogTextField from '../components/PostBlogTextField';
import './Post.css';

const Post = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1); // Go back to previous page
    };

    const handlePost = (postContent, selectedOption) => {
        // Handle post submission logic here if needed
        console.log("Posted:", postContent, "Community:", selectedOption);
        navigate('/'); // Redirect to the home page
    };

    return (
        <div className="post-page-container">
            <PostBlogTextField onCancel={handleCancel} onPost={handlePost} />
        </div>
    );
};

export default Post;
