import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FriendsRequests.css';
import userData from '../fillerData/users.json';

const FriendRequests = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);

  useEffect(() => {
    const sortedUsers = [...userData].sort((a, b) => a.username.localeCompare(b.username));
    setIncomingRequests(sortedUsers);
    setOutgoingRequests(sortedUsers);
  }, []);

  return (
    <div>
      <header>
        <div className="header-content">
          <Link to='/friendslist'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
            </svg>
          </Link>
          <Link to="/friendsrequests" className="custom-link">Requests</Link>
        </div>
      </header>

      <div className='container-friends'>
        <h6>Incoming Requests</h6>
        <div className="friends-list">
          {incomingRequests.map(user => (
            <div key={user.id} className="request-item">
              <div className="username">
                <span>{user.username}</span>
              </div>
              <div className="request-actions">
                <button className='border border-green-700 py-1 px-2 rounded text-sm hover:bg-green-700 focus:outline-none'>✔</button>
                <button className='border border-red-600 py-1 px-2 rounded text-sm hover:bg-red-600 focus:outline-none'>✖</button>
              </div>
            </div>
          ))}
        </div>
        <p></p>
        <h6>Outgoing Requests</h6>
        <div className="friends-list">
          {outgoingRequests.map(user => (
            <div key={user.id} className="request-item">
              <div className="username">
                <span>{user.username}</span>
              </div>
              <div className="request-actions">
                <button className='border border-black py-1 px-2 rounded text-sm hover:bg-black hover:text-white'>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
