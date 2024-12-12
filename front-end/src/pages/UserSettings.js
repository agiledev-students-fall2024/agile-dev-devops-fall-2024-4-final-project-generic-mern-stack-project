import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import '../assets/styles/profile.css';
import Button from '../components/button';
import { getUserSettings, updateUserSettings } from '../api';

const UserSettings = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Fetch the JWT token from localStorage

    // State variables for user data
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('********'); // Display password as masked by default
    const [aboutme, setAboutme] = useState('');
    const [number, setNumber] = useState('');
    const [otherSocial, setOtherSocial] = useState('');
    const [friends, setFriends] = useState([]); // Initialize as an empty array to avoid runtime errors
    const [newFriend, setNewFriend] = useState('');
    const [friendSearch, setFriendSearch] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null); // Profile photo for upload functionality

    // Loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Decode the JWT token to get the username
    useEffect(() => {
        if (!token) {
            setError('No token provided. Please log in.');
            setTimeout(() => navigate('/login'), 3000); // Redirect to login if no token
            return;
        }

        try {
            const decoded = jwtDecode(token); // Decode the JWT
            setUsername(decoded.username); // Extract the username from the token
        } catch (err) {
            console.error('Error decoding token:', err);
            setError('Invalid token. Please log in again.');
            setTimeout(() => navigate('/login'), 3000); // Redirect if token is invalid
        }
    }, [token, navigate]);

    // Fetch user settings from the backend
    useEffect(() => {
        if (!username) return;

        const fetchSettings = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getUserSettings(username); // API call to fetch user settings
                setPassword('********'); // Display masked password by default
                setAboutme(data.aboutMe || '');
                setNumber(data.number || '');
                setOtherSocial(data.otherSocialMedia || '');
                setFriends(data.friendsList || []); // Ensure friends is always an array
                setProfilePhoto(data.profilePhoto || null); // Load profile photo if available
            } catch (err) {
                console.error('Error fetching user settings:', err);
                setError('Failed to load user settings.');
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, [username]);

    

    // Handle profile photo upload
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const options = {
                maxSizeMB: 0.25,
                maxWidthOrHeight: 540,
                useWebWorker: true,
            };

            try {
                const compressedFile = await imageCompression(file, options); // Compress the image
                const reader = new FileReader();
                reader.onload = () => {
                    setProfilePhoto(reader.result); // Convert to base64 and update state
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error('Error compressing image:', error);
                setError('Failed to process the image. Try a smaller one.');
            }
        }
    };

    // Remove the profile photo
    const handleRemovePhoto = () => {
        setProfilePhoto(null);
    };

    // Save all user settings to the backend
    const handleSaveSettings = async () => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const updatedData = {
                aboutMe: aboutme,
                number,
                otherSocialMedia: otherSocial,
                friendsList: friends,
                profilePhoto,
            };
    
            console.log('Sending data to backend:', updatedData); // Debug log
    
            const response = await updateUserSettings(username, updatedData);
            console.log('Response from backend:', response); // Debug log
    
            setSuccessMessage('Settings updated successfully!');
        } catch (err) {
            console.error('Error updating user settings:', err);
            setError('Failed to update settings.');
        } finally {
            setLoading(false);
        }
    };
    

    // Add a new friend to the friends list
    const handleAddFriend = () => {
        if (newFriend && !friends.includes(newFriend)) {
            setFriends((prev) => [...prev, newFriend]);
            setNewFriend('');
        }
    };

    // Remove a friend from the friends list
    const handleRemoveFriend = (friend) => {
        setFriends((prev) => prev.filter((f) => f !== friend));
    };

    // Filter friends based on search input
    const filteredFriends = (friends || []).filter((friend) =>
        friend.toLowerCase().includes(friendSearch.toLowerCase())
    );

    return (
        <div className="profile-container">
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            {/* Profile photo upload and preview */}
            <div className="avatar-frame">
                {profilePhoto ? (
                    <>
                        <img src={profilePhoto} alt="Profile" className="avatar-image" />
                        <Button className="remove-button" onClick={handleRemovePhoto}>
                            Remove
                        </Button>
                    </>
                ) : (
                    <label className="upload-label">
                        Upload image from your device
                        <input type="file" className="file-input" onChange={handleFileChange} />
                    </label>
                )}
            </div>

            {/* User information fields */}
            <div className="info-section">
                <label>
                    <strong>Username:</strong>
                    <input type="text" value={username} readOnly className="info-input" />
                </label>
            </div>

            <div className="info-section">
                <label>
                    <strong>Password:</strong>
                    <input type="password" value={password} readOnly className="info-input" />
                </label>
            </div>

            <div className="info-section">
                <label>
                    <strong>About Me:</strong>
                    <input
                        type="text"
                        value={aboutme}
                        onChange={(e) => setAboutme(e.target.value)}
                        className="info-input"
                    />
                </label>
            </div>

            <div className="info-section">
                <label>
                    <strong>Number:</strong>
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="info-input"
                    />
                </label>
            </div>

            <div className="info-section">
                <label>
                    <strong>Other Social Media:</strong>
                    <input
                        type="text"
                        value={otherSocial}
                        onChange={(e) => setOtherSocial(e.target.value)}
                        className="info-input"
                    />
                </label>
            </div>

            {/* Friends management */}
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

            {/* Save all changes button */}
            <Button onClick={handleSaveSettings} disabled={loading}>
                Save All Changes
            </Button>
        </div>
    );
};

export default UserSettings;