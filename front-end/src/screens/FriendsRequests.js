import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FriendsRequests.css';

const apiUrl = process.env.REACT_APP_API_URL;

const FriendRequests = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/friends/requests`);
        if (response.ok) {
          let { incomingRequests, outgoingRequests } = await response.json();

          // ALPHABETICALLY SORTED
          incomingRequests = incomingRequests.sort((a, b) => (a.fromUser?.name || "").localeCompare(b.fromUser?.name || ""));
          outgoingRequests = outgoingRequests.sort((a, b) => (a.toUser?.name || "").localeCompare(b.toUser?.name || ""));

          setIncomingRequests(incomingRequests);
          setOutgoingRequests(outgoingRequests);
        } else {
          console.error('Failed to fetch friend requests');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      const response = await fetch(`${apiUrl}/api/friends/requests/accept/${requestId}`, { method: 'POST' });
      if (response.ok) {
        setIncomingRequests(prev => prev.filter(request => request.id !== requestId));
      } else {
        console.error('Failed to accept friend request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      const response = await fetch(`${apiUrl}/api/friends/requests/decline/${requestId}`, { method: 'POST' });
      if (response.ok) {
        setIncomingRequests(prev => prev.filter(request => request.id !== requestId));
      } else {
        console.error('Failed to decline friend request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = async (requestId) => {
    try {
      const response = await fetch(`${apiUrl}/api/friends/requests/cancel/${requestId}`, { method: 'POST' });
      if (response.ok) {
        setOutgoingRequests(prev => prev.filter(request => request.id !== requestId));
      } else {
        console.error('Failed to cancel friend request');
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
          <Link to="/friendsrequests" className="custom-link">Requests</Link>
        </div>
      </header>

      <div className='container-friends'>
        <h6>Incoming Requests</h6>
        <div className="friends-list">
          {incomingRequests.map(request => (
            <div key={request.id} className="request-item">
              <div className="username">
                <span>{request.fromUser ? request.fromUser.name : "Unknown"} (@{request.fromUser ? request.fromUser.username : "Unknown"})</span>
              </div>
              <div className="request-actions">
                <button 
                  className='border border-green-700 py-1 px-2 rounded text-sm hover:bg-green-700 focus:outline-none' 
                  onClick={() => handleAccept(request.id)}
                >
                  ✔
                </button>
                <button 
                  className='border border-red-600 py-1 px-2 rounded text-sm hover:bg-red-600 focus:outline-none' 
                  onClick={() => handleDecline(request.id)}
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
        </div>
        <p></p>
        <h6>Outgoing Requests</h6>
        <div className="friends-list">
          {outgoingRequests.map(request => (
            <div key={request.id} className="request-item">
              <div className="username">
                <span>{request.toUser ? request.toUser.name : "Unknown"} (@{request.toUser ? request.toUser.username : "Unknown"})</span>
              </div>
              <div className="request-actions">
                <button 
                  className='border border-black py-1 px-2 rounded text-sm hover:bg-black hover:text-white' 
                  onClick={() => handleCancel(request.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
