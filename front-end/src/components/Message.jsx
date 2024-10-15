import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Message = ({input_user, input_text, className, input_timestamp}) => {
    const [text, setText] = useState(input_text);
    const [user, setUser] = useState(input_user);
    return (
        <div className={`flex flex-col p-3 rounded-lg max-w-xs break-words ${className}`}>
            <p className="text-sm">{user}</p>
            <p>{text}</p>
            <p className="text-xs text-gray-400">{input_timestamp}</p>
        </div>
    )
};

export default Message;