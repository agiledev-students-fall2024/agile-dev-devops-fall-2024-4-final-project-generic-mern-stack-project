import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../components/authContext';
import '../styles/FriendsBlocked.css';

const apiUrl = process.env.REACT_APP_API_URL;

const FriendsBlocked = () => {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const { token } = useContext(AuthContext);

    // FETCH ALL BLOCKED USERS
    useEffect(() => {
        const fetchBlockedUsers = async () => {
            if (!token) return;

            try {
                const response = await axios.get(`${apiUrl}/api/friends/blocked`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBlockedUsers(response.data.sort((a, b) => a.name.localeCompare(b.name)));
            } catch (error) {
                console.error('Error fetching blocked users:', error);
            }
        };
        fetchBlockedUsers();
    }, [token]);

    const handleUnblock = async (userId) => {
        if (!token) return;

        try {
            await axios.post(`${apiUrl}/api/friends/unblock/${userId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBlockedUsers(prevBlocked => prevBlocked.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error unblocking user:', error);
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
                    <Link to="/friendsblocked" className="custom-link">Blocked</Link>
                </div>
            </header>

            <div className='container-friends'>
                <h6>Users you have blocked</h6>
                <div className="friends-list">
                    {blockedUsers.length > 0 ? (
                        blockedUsers.map(user => (
                            <div key={user.id} className="blocked-item">
                                <div className="username">
                                    <span>{user.name} (@{user.username})</span>
                                </div>
                                <div className="blocked-actions">
                                    <button 
                                        className='border border-black py-1 px-2 rounded text-sm hover:bg-black hover:text-white'
                                        onClick={() => handleUnblock(user.id)}
                                    >
                                        Unblock
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No blocked users.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FriendsBlocked;
