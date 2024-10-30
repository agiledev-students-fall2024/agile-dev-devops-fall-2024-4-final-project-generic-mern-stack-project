// C14 
import React, { useState } from 'react';
import './PostBlogTextField.css';
import DropdownMenu from './DropdownMenu';

const PostBlogTextField = ({ onCancel, onPost }) => {
    const [postContent, setPostContent] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handlePostClick = () => {
        if (onPost) {
            onPost(postContent, selectedOption);
        }
        setPostContent(''); // Clear the text area after posting
        setSelectedOption(''); // Clear the selected option
    };

    const handleCancelClick = () => {
        if (onCancel) {
            onCancel();
        }
        setPostContent(''); // Clear the text area if canceled
        setSelectedOption(''); // Clear the selected option
    };

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="post-blog-container">
            <div className="header">
                <button onClick={handleCancelClick}>Cancel</button>
                <button onClick={handlePostClick}>Post</button>
            </div>
            <DropdownMenu 
                name="your-communities" 
                label="Your Communities" 
                options={['Community 1', 'Community 2', 'Community 3']} 
                onChange={handleDropdownChange} 
            />
            <textarea
                placeholder="Write your post here..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="footer">
                <button>Attach Image</button>
                
            </div>
        </div>
    );
};

export default PostBlogTextField;

