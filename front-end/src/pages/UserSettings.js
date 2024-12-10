import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import '../assets/styles/profile.css';
import Button from '../components/button';
import { getUserSettings, updateUserSettings } from '../api';

const UserSettings = () => {
    const [username, setUsername] = useState("Dreamer1"); // Make sure this is a valid username
    const [password, setPassword] = useState("Dreamer123456");
    const [aboutme, setAboutme] = useState("Hello! I am a Dreamer.");
    const [number, setNumber] = useState("123-456-7890");
    const [otherSocial, setOtherSocial] = useState("https://example.com");

    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingAboutme, setIsEditingAboutme] = useState(false);
    const [isEditingNumber, setIsEditingNumber] = useState(false);
    const [isEditingOtherSocial, setIsEditingOtherSocial] = useState(false);

    // Loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Friend management
    const [friends, setFriends] = useState([]);
    const [friendSearch, setFriendSearch] = useState("");
    const [newFriend, setNewFriend] = useState("");


    //Profile photo management
    const [profilePhoto, setProfilePhoto] = useState(null);



    // Fetch user settings when the component loads
    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getUserSettings(username);
                setUsername(data.username);
                setPassword(data.password); // Assuming password is fetched securely
                setAboutme(data.aboutMe);
                setNumber(data.number);
                setOtherSocial(data.otherSocialMedia);
                setFriends(data.friendsList);
                setProfilePhoto(data.profilePhoto)
            } catch (err) {
                console.error("Error fetching user settings:", err);
                setError("Failed to load user settings");
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, [username]);


    // Handle profile file photo change

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file){
            const reader = new FileReader()

            const options = { // [To do]: Be able to process Large memory images
                maxSizeMB: 0.25, // Maximum memory
                maxWidthOrHeight: 540, //Maximum dimensions
                useWebWorker: true,
            };

            try{

                const compressedFile = await imageCompression(file, options);
                const reader = new FileReader();

                reader.onload = () =>{
                    setProfilePhoto(reader.result) // Store image in base-64 string
                };
                reader.readAsDataURL(compressedFile)

            }
            catch{// If there is failure in compression
                console.log("Errer occured during compression", error)
                setError("Failed to process image (try to upload a smaller image) ")

            }


        }

    }


    const handleRemovePhoto = () => {
        setProfilePhoto(null)
    }




    // Handle updating user settings
    const handleSaveSettings = async () => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const updatedData = await updateUserSettings(username, {
                aboutMe: aboutme,
                number,
                otherSocialMedia: otherSocial,
                friendsList: friends,
                profilePhoto,
            });
            setSuccessMessage("Settings updated successfully!");
            setAboutme(updatedData.user.aboutMe);
            setNumber(updatedData.user.number);
            setOtherSocial(updatedData.user.otherSocialMedia);
            setFriends(updatedData.user.friendsList);
            setProfilePhoto(updatedData.user.profilePhoto)
        } catch (err) {
            console.error("Error updating user settings:", err);
            setError("Failed to update settings");
        } finally {
            setLoading(false);
        }
    };

    const handleEditToggle = (field) => {
        switch (field) {
            case "username":
                setIsEditingUsername((prev) => !prev);
                if (isEditingUsername) setUsername(username || "Dreamer1");
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

    const handleAddFriend = () => {
        if (newFriend && !friends.includes(newFriend)) {
            setFriends((prev) => [...prev, newFriend]);
            setNewFriend("");
        }
    };

    const handleRemoveFriend = (friend) => {
        setFriends((prev) => prev.filter((f) => f !== friend));
    };

    const filteredFriends = friends.filter((friend) =>
        friend.toLowerCase().includes(friendSearch.toLowerCase())
    );

    return (
        <div className="profile-container">
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <div className="avatar-frame">
                {profilePhoto ? (
                    <>
                        <img src={profilePhoto} alt="Profile" className="avatar-image" />
                        <div className="profbutn-container">
                            <Button className="remove-button" onClick={handleRemovePhoto}>Remove</Button>
                        </div>
                    </>
                ) : (
                    <label className="upload-label">
                        Upload image from your device
                        <input type="file" className="file-input" onChange={handleFileChange} />
                    </label>
                )}
                </div>


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

            <Button onClick={handleSaveSettings} disabled={loading}>Save All Changes</Button>

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

export default UserSettings;
