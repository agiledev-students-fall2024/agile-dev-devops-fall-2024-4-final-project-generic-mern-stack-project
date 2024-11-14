// C14 
import React, { useState } from 'react';
import './PostBlogTextField.css';
import DropdownMenu from './DropdownMenu';

const PostBlogTextField = ({ onCancel, onPost }) => {
    const [postContent, setPostContent] = useState('');
    const [selectedOption, setSelectedOption] = useState('Community 1');
    const [attachedImage, setAttachedImage] = useState(null);

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

    const handleAttachImage = () => {
        setAttachedImage("https://images.pexels.com/photos/1759531/pexels-photo-1759531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
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
                defaultValue="Community 1"
                onChange={handleDropdownChange} 
            />
            <textarea
                placeholder="Write your post here..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
            />
            {attachedImage && <img src={attachedImage} alt="Attached" className="attached-image" />}
            <div className="footer">
                <button onClick={handleAttachImage}>Attach Image</button>
            </div>
        </div>
    );
};

export default PostBlogTextField;
