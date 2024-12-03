import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../components/authContext';
import '../styles/FriendsList.css';

const apiUrl = process.env.REACT_APP_API_URL;

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const { token } = useContext(AuthContext);

  // FETCH FRIENDS FROM BACKEND
  useEffect(() => {
    const fetchFriends = async () => {
      if (!token) {
        console.error('No token available');
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/friends/friends`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFriends(response.data);
      } catch (error) {
        console.error('Error Fetching Friends:', error.response?.status, error.message);
      }
    };

    fetchFriends();
  }, [token]);

  // HANDLE BLOCK USER
  const handleBlock = async (friendId) => {
    try {
      const response = await axios.post(`${apiUrl}/api/friends/block/${friendId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setFriends(friends.filter(friend => friend.id !== friendId)); // REMOVE BLOCKED FRIEND FROM DISPLAY
      } else {
        console.error('Failed to block friend');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // HANDLE REMOVE FRIEND
  const handleRemove = async (friendId) => {
    try {
      const response = await axios.post(`${apiUrl}/api/friends/remove/${friendId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setFriends(friends.filter(friend => friend.id !== friendId)); // REMOVE DELETED FRIEND FROM DISPLAY
      } else {
        console.error('Failed to remove friend');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // EXTRACT INITIALS AND SORT ALPHABETICALLY
  const alphabet = [...new Set(friends.map(friend => friend.name[0]))].sort();

  return (
    <div>
      <header>
        <div className="header-content">
          <Link to='/profile/spongebob'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
            </svg>
          </Link>
          <Link to="/friendslist" className="custom-link">Friends</Link>
        </div>
      </header>

      <div className='container-friends'>
        <div className="friends-actions">
          <Link to='/friendssearch'><button className="action-btn border border-black rounded">Search</button></Link>
          <Link to='/friendsadd'><button className="action-btn border border-black rounded">Add Friend</button></Link>
          <Link to='/friendsrequests'><button className="action-btn border border-black rounded">All Request</button></Link>
        </div>

        <div className="friends-list">
          {alphabet.map(letter => (
            <div key={letter}>
              <h6 className="initials">{letter}</h6>
              {friends
                .filter(friend => friend.name.startsWith(letter))
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(friend => (
                  <div key={friend.id} className="friend-item">
                    <div>
                      <span>
                        {friend.name}
                        <span style={{ color: 'grey', fontSize: 'smaller', fontStyle: 'italic' }}>
                          &nbsp;({friend.username})
                        </span>
                      </span>
                    </div>
                    <div className="friend-actions">
                      <button className='border border-black py-1 px-2 rounded text-sm hover:bg-black hover:text-white' onClick={() => handleBlock(friend.id)}>Block</button>
                      <button className='border border-black py-1 px-2 rounded text-sm hover:bg-black hover:text-white' onClick={() => handleRemove(friend.id)}>Remove</button>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        <footer className="footer">
          <p>{friends.length} {friends.length > 1 ? 'Contacts' : 'Contact'}</p>
        </footer>
        
        <Link to='/friendsblocked'><button className="action-btn border border-black rounded">Blocked</button></Link>
      </div>   
    </div>
  );
};

export default FriendsList;
