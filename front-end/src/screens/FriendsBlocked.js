import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FriendsBlocked.css';

const FriendsBlocked = () => {
    const [blockedUsers, setBlockedUsers] = useState([]);

    // FETCH ALL BLOCKED USERS
    useEffect(() => {
        const fetchBlockedUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/friends/blocked');
                if (response.ok) {
                    const data = await response.json();
                    setBlockedUsers(data);
                } else {
                    console.error('Failed to fetch blocked users');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchBlockedUsers();
    }, []);

    const handleUnblock = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/friends/unblock/${userId}`, { method: 'POST' });
            if (response.ok) {
                // REMOVE UNBLOCKED USERS FROM BLOCKED STATE
                setBlockedUsers(prevBlocked => prevBlocked.filter(user => user.id !== userId));
            } else {
                console.error('Failed to unblock user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <header>
                <div className="header-content">
                    <Link to='/friendslist'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
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

