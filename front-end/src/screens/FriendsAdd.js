import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FriendsAdd.css';
import userData from '../fillerData/users.json';

const FriendsAdd = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFriends, setFilteredFriends] = useState([]);

    // FILTER FRIENDS BASED ON USERNAME MATCH
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredFriends([]); // IF NO USER INPUT, DON'T SHOW ANYTHING
        } else {
            const filtered = userData
                .filter(user => user.username.toLowerCase() === searchTerm.toLowerCase())
                .sort((a, b) => a.name.localeCompare(b.name));

            setFilteredFriends(filtered);
        }
    }, [searchTerm]);

    return (
        <div>
            <header>
                <div className="header-content">
                    <Link to='/friendslist'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                        </svg>
                    </Link>
                    <Link to="/friendsadd" className="custom-link">Add Friend</Link>
                </div>
            </header>
            
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
                                    <button className='border border-black py-1 px-2 rounded text-sm hover:bg-black hover:text-white'>Add Friend</button>
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
