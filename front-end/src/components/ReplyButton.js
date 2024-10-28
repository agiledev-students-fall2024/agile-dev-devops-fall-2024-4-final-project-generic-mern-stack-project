//For replies page

import React from 'react';
import './ReplyButton.css';

const ReplyButton = ({ onClick }) => {
    return (
        <button className="reply-button" onClick={onClick}>
            Reply
        </button>
    );
};

export default ReplyButton;
