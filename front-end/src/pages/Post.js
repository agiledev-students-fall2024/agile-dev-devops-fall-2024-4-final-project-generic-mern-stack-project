import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostBlogTextField from '../components/PostBlogTextField';
import './Post.css';

const Post = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    const handlePost = (postContent, selectedOption) => {
        console.log("Posted:", postContent, "Community:", selectedOption);

        // Mock new post data including the attached image URL
        const newPost = {
            id: Date.now(), // Unique id for the mock post
            profilePic: "https://images.pexels.com/photos/1759531/pexels-photo-1759531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Mock profile picture
            name: "John Doe", // Replace with dynamic data if available
            userName: "john_doe", // Replace with dynamic data if available
            text: postContent,
            likes: 0,
            images: ["https://images.pexels.com/photos/1759531/pexels-photo-1759531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]
        };

        // Redirect to Home with the new post added to state
        navigate("/", { state: { newPost } });
    };

    return (
        <div className="post-page-container">
            <PostBlogTextField onCancel={handleCancel} onPost={handlePost} />
        </div>
    );
};

export default Post;




