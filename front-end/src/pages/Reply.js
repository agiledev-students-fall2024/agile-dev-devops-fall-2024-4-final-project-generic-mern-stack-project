import React from 'react';
import PostBlogTextField from '../components/PostBlogTextField';
import NavigationBar from '../components/NavigationBar';
import './Reply.css'; // Create this file if you need additional styling for Reply

const Reply = () => {
    return (
        <div className="reply-page-container">
            <PostBlogTextField />
            <NavigationBar />
        </div>
    );
};

export default Reply;
