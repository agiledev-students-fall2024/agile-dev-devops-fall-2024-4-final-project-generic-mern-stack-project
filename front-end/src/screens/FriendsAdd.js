import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../components/authContext';
import '../styles/FriendsAdd.css';

const apiUrl = process.env.REACT_APP_API_URL;

const FriendsAdd = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [potentialFriends, setPotentialFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [notification, setNotification] = useState(''); // STATE FOR NOTIFICATION
    const { token } = useContext(AuthContext);

    // FETCH ALL POTENTIAL FRIENDS
    useEffect(() => {
        const fetchPotentialFriends = async () => {
            if (!token) return;

            try {
                const response = await axios.get(`${apiUrl}/api/friends/potential-friends`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPotentialFriends(response.data);
            } catch (error) {
                console.error('Error fetching potential friends:', error);
            }
        };
        fetchPotentialFriends();
    }, [token]);

    // FILTER AND SHOW FRIENDS ONLY IF USERNAME COMPLETELY MATCHES
    useEffect(() => {
        const filtered = potentialFriends
            .filter(user => user.username.toLowerCase() === searchTerm.toLowerCase())
            .sort((a, b) => a.name.localeCompare(b.name));
        setFilteredFriends(filtered);
    }, [searchTerm, potentialFriends]);

    // ADD FRIEND
    const addFriend = async (friendId) => {
        if (!token) return;

        try {
            await axios.post(`${apiUrl}/api/friends/request/${friendId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPotentialFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendId));
            setFilteredFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendId));
            setNotification('Friend request sent'); // Show notification
            setTimeout(() => setNotification(''), 3000); // Hide notification after 3 seconds
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    return (
        <div>
            <header>
                <div className="header-content">
                    <Link to='/friendslist'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                        </svg>
                    </Link>
                    <Link to="/friendsadd" className="custom-link">Add Friend</Link>
                </div>
            </header>

            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}

            <div className='container-friends'>
                <div className="input-bar-add">
                    <input 
                        type="text" 
                        className="search-input-add"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter username"
                    />
                </div>

                <div className="search-results-add">
                    {filteredFriends.length > 0 ? (
                        filteredFriends.map(friend => (
                            <div key={friend.id} className="friend-search-item-add">
                                <div className="friend-search-info-add">
                                    <h5>{friend.name}</h5>
                                </div>
                                <div className="friend-actions">
                                    <button 
                                        className='border border-black py-1 px-2 rounded text-sm hover:bg-black hover:text-white' 
                                        onClick={() => addFriend(friend.id)}
                                    >
                                        Add Friend
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        searchTerm && <p>No matching friends found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FriendsAdd;
