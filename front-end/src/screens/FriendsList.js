import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import '../styles/FriendsList.css';
import userData from '../fillerData/users.json'

const FriendsList = () => {
  // FETCH USER DATA FROM USERS.JSON
  const [userDataState, setUserDataState] = useState([]);
  useEffect(() => {
    setUserDataState(userData.map(user => ({ name: user.name, id: user.id })));
  }, []);

  // EXTRACT AND SORT ALL NAME INITIALS ALPHABETICALLY
  const alphabet = [...new Set(userDataState.map(user => user.name[0]))].sort();

  return (
    <div>
      <header>
        <div className="header-content">
          <Link to='/'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
            </svg>
          </Link>
          <Link to="/friendslist" className="custom-link">Friends</Link>
        </div>
      </header>

      <Container>
        <div className="friends-actions">
          <Button variant="secondary" className="action-btn">Search</Button>
          <Button variant="secondary" className="action-btn">Add Friend</Button>
          <Button variant="secondary" className="action-btn">Requests</Button>
        </div>

        <div className="friends-list">
          {alphabet.map(letter => (
            <div key={letter}>
              <h6 className="initials">{letter}</h6>
              {userDataState
                .filter(user => user.name.startsWith(letter))
                .sort((a, b) => a.name.localeCompare(b.name)) // SORT ALPHABETICALLY WITHIN EACH INITIAL
                .map(user => (
                  <div key={user.id} className="friend-item">
                    <span>{user.name}</span>
                    <div className="friend-actions">
                      <Button variant="outline-dark" size="sm">Block</Button>
                      <Button variant="outline-dark" size="sm">Remove</Button>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        <footer className="footer">
          <p>{userDataState.length} {userDataState.length > 1 ? 'Contacts' : 'Contact'}</p>
          <Button variant="secondary" className="blocked-btn">Blocked</Button>
        </footer>
      </Container>   
    </div>
  );
};

export default FriendsList;
