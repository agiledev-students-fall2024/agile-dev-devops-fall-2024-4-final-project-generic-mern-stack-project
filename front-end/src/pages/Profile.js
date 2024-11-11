import React, { useState } from 'react';
import '../assets/styles/profile.css';
import Button from '../components/button';



const Profile = () => {
    const [username, setUsername] = useState("Dreamer");
    const [password, setPassword] = useState("Dreamer123456");
    const [aboutme, setAboutme] = useState("Hello! I am a Dreamer."); // Default aboutme
    const [number, setNumber] = useState("123-456-7890"); // Default number
    const [otherSocial, setOtherSocial] = useState("https://example.com"); // Default other social media

    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingAboutme, setIsEditingAboutme] = useState(false);
    const [isEditingNumber, setIsEditingNumber] = useState(false);
    const [isEditingOtherSocial, setIsEditingOtherSocial] = useState(false);

    // Friend management
    const [friends, setFriends] = useState(["Alice", "Bob", "Charlie"]);
    const [friendSearch, setFriendSearch] = useState("");
    const [newFriend, setNewFriend] = useState("");

    const handleEditToggle = (field) => {
        switch (field) {
            case "username":
                setIsEditingUsername((prev) => !prev);
                if (isEditingUsername) setUsername(username || "Dreamer");
                break;
            case "password":
                setIsEditingPassword((prev) => !prev);
                if (isEditingPassword) setPassword(password || "Dreamer123456");
                break;
            case "aboutme":
                setIsEditingAboutme((prev) => !prev);
                if (isEditingAboutme) setAboutme(aboutme || "Hello! I am a Dreamer.");
                break;
            case "number":
                setIsEditingNumber((prev) => !prev);
                if (isEditingNumber) setNumber(number || "123-456-7890");
                break;
            case "otherSocial":
                setIsEditingOtherSocial((prev) => !prev);
                if (isEditingOtherSocial) setOtherSocial(otherSocial || "https://example.com");
                break;
            default:
                break;
        }
    };

        // Add a new friend
        const handleAddFriend = () => {
            if (newFriend && !friends.includes(newFriend)) {
                setFriends((prev) => [...prev, newFriend]);
                setNewFriend("");
            }
        };
    
        // Remove a friend
        const handleRemoveFriend = (friend) => {
            setFriends((prev) => prev.filter((f) => f !== friend));
        };
    
        // Search for friends
        const filteredFriends = friends.filter((friend) =>
            friend.toLowerCase().includes(friendSearch.toLowerCase())
        );

    return (
        <div className="profile-container">
            {/* Avatar Upload Section */}
            <div className="avatar-frame">
                <label className="upload-label">
                    Upload image from your device
                    <input type="file" className="file-input" onChange={() => {}} />
                </label>
            </div>

            {/* Username Section */}
            <div className="info-section">
                <label>
                    <strong>Username:</strong>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        readOnly={!isEditingUsername}
                        className="info-input"
                    />
                </label>
                <Button onClick={() => handleEditToggle("username")}>
                    {isEditingUsername ? "Save" : "Edit"}
                </Button>
            </div>

            {/* Password Section */}
            <div className="info-section">
                <label>
                    <strong>Password:</strong>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        readOnly={!isEditingPassword}
                        className="info-input"
                    />
                </label>
                <Button onClick={() => handleEditToggle("password")}>
                    {isEditingPassword ? "Save" : "Edit"}
                </Button>
            </div>

            {/* About Me Section */}
            <div className="info-section">
                <label>
                    <strong>About Me:</strong>
                    <input
                        type="text"
                        value={aboutme}
                        onChange={(e) => setAboutme(e.target.value)}
                        readOnly={!isEditingAboutme}
                        className="info-input"
                    />
                </label>
                <Button onClick={() => handleEditToggle("aboutme")}>
                    {isEditingAboutme ? "Save" : "Edit"}
                </Button>
            </div>

            {/* Number Section */}
            <div className="info-section">
                <label>
                    <strong>Number:</strong>
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        readOnly={!isEditingNumber}
                        className="info-input"
                    />
                </label>
                <Button onClick={() => handleEditToggle("number")}>
                    {isEditingNumber ? "Save" : "Edit"}
                </Button>
            </div>

            {/* Other Social Media Section */}
            <div className="info-section">
                <label>
                    <strong>Other Social Media:</strong>
                    <input
                        type="text"
                        value={otherSocial}
                        onChange={(e) => setOtherSocial(e.target.value)}
                        readOnly={!isEditingOtherSocial}
                        className="info-input"
                    />
                </label>
                <Button onClick={() => handleEditToggle("otherSocial")}>
                    {isEditingOtherSocial ? "Save" : "Edit"}
                </Button>
            </div>

            {/* Friends */}
            <div className="friends-section">
                <h3>Friends List</h3>
                <input
                    type="text"
                    placeholder="Search friends..."
                    value={friendSearch}
                    onChange={(e) => setFriendSearch(e.target.value)}
                    className="search-input"
                />
                <ul className="friend-list">
                    {filteredFriends.map((friend, index) => (
                        <li key={index}>
                            {friend}
                            <Button onClick={() => handleRemoveFriend(friend)}>Remove</Button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Add new friend"
                    value={newFriend}
                    onChange={(e) => setNewFriend(e.target.value)}
                    className="add-input"
                />
                <Button onClick={handleAddFriend}>Add Friend</Button>
            </div>            
        </div>
    );
};

export default Profile;



