import React from 'react';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Message from "./Message.jsx";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const textElement = useRef();

    const sendMessage = () => {
        const newMessage = textElement.current.value;
        if (newMessage.trim() == "") {
            return;
        }
        setMessages(
            [...messages, {user: "user1", text: newMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]
        )
        textElement.current.value = "";
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();  // Prevent newline
            sendMessage();
        }
    }

    return (
        <div className="flex flex-col justify-between w-full max-w-xl h-[32rem] border border-gray-300 rounded-lg shadow-lg bg-white">
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-100">
                {
                    messages.map(
                        (message, i) => (
                        <Message 
                            className={`message ${message.user === 'user1' ? 'self-end bg-blue-500 text-white' : 'self-start bg-gray-300 text-black'}`}
                            input_user={message.user} 
                            input_text={message.text} 
                            input_timestamp={message.timestamp}
                            key={i}
                            />)
                )
                }
            </div>
            <div className="flex p-4 border-t border-gray-300">
                <textarea 
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    type="text" 
                    ref={textElement} 
                    onKeyDown={handleKeyPress}
                />
                <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat;
