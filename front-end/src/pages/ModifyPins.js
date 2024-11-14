import React, { useState } from 'react';

const ModifyPins = () => {
  const [pins, setPins] = useState([
    { id: 1, description: 'My favorite coffee spot.', location: [40.7309, -73.9973] },
    { id: 2, description: 'Relaxing at the park.', location: [40.7326, -73.9973] },
    { id: 3, description: 'Study session spot.', location: [40.7359, -73.9911] },
  ]);

  const [editPinId, setEditPinId] = useState(null);
  const [newDescription, setNewDescription] = useState('');

  const handleEdit = (id) => {
    const pinToEdit = pins.find((pin) => pin.id === id);
    setEditPinId(id);
    setNewDescription(pinToEdit.description);
  };

  const handleSave = () => {
    const updatedPins = pins.map((pin) =>
      pin.id === editPinId ? { ...pin, description: newDescription } : pin
    );
    setPins(updatedPins);
    setEditPinId(null);
    setNewDescription('');
  };

  const handleDelete = (id) => {
    const updatedPins = pins.filter((pin) => pin.id !== id);
    setPins(updatedPins);
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
      color: '#6A1B9A', // Use your theme's primary color
      marginBottom: '20px',
    },
    pinList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '100%',
      maxWidth: '600px',
    },
    pinItem: {
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      position: 'relative',
      minHeight: '120px', // Ensures the box is tall enough
    },
    pinDescription: {
      fontSize: '18px',
      color: '#333',
      marginBottom: '20px',
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 'auto',
    },
    button: {
      padding: '10px 15px',
      fontSize: '14px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    editButton: {
      backgroundColor: '#7e57c2',
      color: 'white',
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: 'white',
    },
    editMode: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Modify Your Pins</h1>
      <div style={styles.pinList}>
        {pins.map((pin) => (
          <div style={styles.pinItem} key={pin.id}>
            {editPinId === pin.id ? (
              <div style={styles.editMode}>
                <textarea
                  style={styles.textarea}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows="3"
                />
                <div style={styles.actionButtons}>
                  <button
                    style={{ ...styles.button, ...styles.editButton }}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => setEditPinId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p style={styles.pinDescription}>{pin.description}</p>
                <div style={styles.actionButtons}>
                  <button
                    style={{ ...styles.button, ...styles.editButton }}
                    onClick={() => handleEdit(pin.id)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => handleDelete(pin.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModifyPins;
