//Post page is for the blog icon in nav bar in wireframe
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostBlogTextField from '../components/PostBlogTextField';
import './Post.css';

const Post = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    const handlePost = (postContent, selectedOption) => {
        console.log("Posted:", postContent, "Community:", selectedOption);

        // Send post data to the back-end
        axios
            .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/post`, {
                postContent,
                selectedOption
            })
            .then(response => {
                console.log("Post submitted successfully:", response.data);
                navigate('/'); // Redirect to the home page
            })
            .catch(err => {
                console.error("Failed to submit post:", err);
            });
    };

    return (
        <div className="post-page-container">
            <PostBlogTextField onCancel={handleCancel} onPost={handlePost} />
        </div>
    );
};

export default Post;

