// C14 Wilson
import React, { useState } from 'react';
import './PostBlogTextField.css';
import DropdownMenu from './DropdownMenu'; 
import InputField from './InputField';
import SubmitButton from './SubmitButton'; 

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
                <SubmitButton placeholder="Cancel" handleClick={handleCancelClick} />
                <SubmitButton placeholder="Post" handleClick={handlePostClick} />
            </div>
            <DropdownMenu 
                name="category" 
                label="Select Category" 
                options={['Tech', 'Health', 'Lifestyle', 'Education']} 
                onChange={handleDropdownChange} 
            />
            <InputField
                inputfieldName="Post Content"
                inputType="textarea"
                handleChange={(e) => setPostContent(e.target.value)}
                inputValue={postContent}
            />
            <div className="footer">
                <SubmitButton placeholder="Attach Image" />
                <SubmitButton placeholder="Attach GIF" />
            </div>
        </div>
    );
};

export default PostBlogTextField;
