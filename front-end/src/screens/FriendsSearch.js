import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../components/authContext';
import '../styles/FriendsSearch.css';

const apiUrl = process.env.REACT_APP_API_URL;

const FriendsSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [friends, setFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const { token } = useContext(AuthContext);

    // FETCH FRIENDS FROM BACKEND
    useEffect(() => {
        const fetchFriends = async () => {
            if (!token) return;

            try {
                const response = await axios.get(`${apiUrl}/api/friends/friends`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFriends(response.data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };
        fetchFriends();
    }, [token]);

    // FILTER AND SORT BASED ON NAME
    useEffect(() => {
        const filtered = friends
            .filter(friend => friend.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name));

        setFilteredFriends(filtered);
    }, [searchTerm, friends]);

    // BLOCK A USER
    const handleBlock = async (friendId) => {
        if (!token) return;

        try {
            await axios.post(`${apiUrl}/api/friends/block/${friendId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendId));
        } catch (error) {
            console.error('Error blocking friend:', error);
        }
    };

    // REMOVE A FRIEND
    const handleRemove = async (friendId) => {
        if (!token) return;

        try {
            await axios.post(`${apiUrl}/api/friends/remove/${friendId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendId));
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    return (
        <div>
            <header>
                <div className="header-content">
                    <Link to='/friendslist'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 1 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                        </svg>
                    </Link>
                    <Link to="/friendssearch" className="custom-link">Search</Link>
                </div>
            </header>

            <div className='container-friends'>
                <div className="input-bar">
                    <input 
                        type="text" 
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter name"
                    />
                </div>

                <div className="search-results">
                    {filteredFriends.map(friend => (
                        <div key={friend.id} className="friend-search-item">
                            <div className="friend-search-info">
                                <span>
                                    {friend.name}
                                    <span style={{ color: 'grey', fontSize: 'smaller', fontStyle: 'italic' }}>
                                        &nbsp;({friend.username})
                                    </span>
                                </span>
                            </div>
                            <div className="friend-actions">
                                <button 
                                    className='border border-black py-1 px-2 rounded text-sm hover:bg-black hover:text-white' 
                                    onClick={() => handleBlock(friend.id)}
                                >
                                    Block
                                </button>
                                <button 
                                    className='border border-black py-1 px-2 rounded text-sm hover:bg-black hover:text-white' 
                                    onClick={() => handleRemove(friend.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FriendsSearch;
