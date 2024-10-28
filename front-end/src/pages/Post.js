//Post page is for the blog icon in nav bar in wireframe
import React from 'react';
import PostBlogTextField from '../components/PostBlogTextField';
import NavigationBar from '../components/NavigationBar';
import './Post.css'; 

const Post = () => {
    return (
        <div className="post-page-container">
            <PostBlogTextField />
            <NavigationBar />
        </div>
    );
};

export default Post;
