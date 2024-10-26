import React from 'react';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import Message from "./Message.jsx";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textElement = useRef();

    const sendMessage = () => {
        const newMessage = textElement.current.value;
        if (newMessage.trim() == "") {
            return;
        }
        setMessages(
            [...messages, { user: "user1", text: newMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
        )
        textElement.current.value = "";
        setShowEmojiPicker(false);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();  // Prevent newline
            sendMessage();
        }
    }

    const onEmojiClick = (emojiData) => {
        textElement.current.value += emojiData.emoji;
    };

    return (
        <div className="flex flex-col justify-between w-full h-screen max-w-xl border border-gray-700 rounded-lg shadow-lg bg-gray-900">
            {/* Messages Container */}
            <div className="flex-grow p-4 space-y-4 bg-gray-800 overflow-y-auto">
                {messages.map((message, i) => (
                    <div key={i} className="message self-end bg-blue-600 text-white p-3 rounded-lg">
                        <p>{message.text}</p>
                        <p className="text-xs text-gray-400">{message.timestamp}</p>
                    </div>
                ))}
            </div>

            {/* Input and Emoji Picker */}
            <div className="flex p-4 border-t border-gray-700 relative">
                {/* Textarea */}
                <textarea
                    className="p-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    type="text"
                    ref={textElement}
                    onKeyDown={handleKeyPress}
                />
                <button
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="submit"
                    onClick={sendMessage}
                >
                    Send
                </button>
                
                {/* Emoji Toggle Button */}
                <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="ml-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                    😊
                </button>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                    <div className="absolute bottom-16 right-0 bg-gray-800 border border-gray-700 rounded-lg z-10 p-2 shadow-lg max-h-40 overflow-auto">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;