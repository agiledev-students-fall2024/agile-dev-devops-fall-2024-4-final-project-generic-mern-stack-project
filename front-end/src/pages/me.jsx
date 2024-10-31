import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './me.css';

const Me = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [editFields, setEditFields] = useState({
    first_name: false,
    last_name: false,
    username: false,
    email: false,
    password: false,
  });
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          'https://my.api.mockaroo.com/tracker.json?key=a3c50f90'
        );
        setUser(response.data[0]); // Assuming the response is an array with user objects
        setUpdatedData(response.data[0]);
      } catch (error) {
        setError('Unable to load user data');
        console.error('Error fetching user data from Mockaroo:', error);
      }
    };

    fetchUserData();
  }, []);

  const toggleEditField = (field) => {
    setEditFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e, field) => {
    setUpdatedData({ ...updatedData, [field]: e.target.value });
  };

  const handleSave = (field) => {
    setMessage(`"${field}" has been updated!`);
    toggleEditField(field);
    // In a real app, you would also send the updated data to the backend here.
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="me-container">
      <h2>My Account</h2>
      <img
        className="profile-pic"
        src={`https://picsum.photos/seed/${user.username}/100`}
        alt="Profile"
      />

      {/* Editable Fields */}
      {['first_name', 'last_name', 'username', 'email', 'password'].map(
        (field) => (
          <div key={field} className="field-container">
            <label>
              <strong>{field.replace('_', ' ').toUpperCase()}:</strong>
            </label>
            {editFields[field] ? (
              <div className="edit-input-container">
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  value={updatedData[field] || ''}
                  onChange={(e) => handleChange(e, field)}
                  placeholder={`Enter new ${field.replace('_', ' ')}`}
                  className="edit-input"
                />
                <button className="save-btn" onClick={() => handleSave(field)}>
                  Save
                </button>
              </div>
            ) : (
              <div className="display-container">
                <span className="field-value">
                  {field === 'password' ? '***' : updatedData[field]}
                </span>
                <button
                  className="edit-btn"
                  onClick={() => toggleEditField(field)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        )
      )}

      {/* Display Info Message */}
      {message && <p className="info-message">{message}</p>}
    </div>
  );
};

export default Me;
