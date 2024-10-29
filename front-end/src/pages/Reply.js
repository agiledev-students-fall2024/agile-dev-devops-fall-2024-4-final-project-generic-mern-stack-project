// Replay page is for the Reply icon in replies page

import React from 'react';
import PostBlogTextField from '../components/PostBlogTextField';
import NavigationBar from '../components/NavigationBar';
import './Reply.css'; 
const Reply = () => {
    return (
        <div className="reply-page-container">
            <PostBlogTextField />
        </div>
    );
};

export default Reply;
