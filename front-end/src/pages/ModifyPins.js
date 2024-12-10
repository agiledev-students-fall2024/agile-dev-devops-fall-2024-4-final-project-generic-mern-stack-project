import React, { useContext, useState } from 'react';
import { PinContext } from '../PinContext';

const ModifyPins = () => {
  const {pins, updatePin, deletePin} = useContext(PinContext);
  const [editPinId, setEditPinId] = useState(null);
  const [newDescription, setNewDescription] = useState('');

  const handleEdit = (id, description) => {
    // const pinToEdit = pins.find((pin) => pin.id === id);
    setEditPinId(id);
    setNewDescription(description);
  };

  const handleSave = () => {

    if (editPinId){
      updatePin(editPinId, newDescription);
      setEditPinId(null)
      setNewDescription('')
    }

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
          <div style={styles.pinItem} key={pin._id}>
            {editPinId === pin._id ? (
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
                <p style={styles.pinDescription}>{pin.message}</p>
                <div style={styles.actionButtons}>
                  <button
                    style={{ ...styles.button, ...styles.editButton }}
                    onClick={() => handleEdit(pin._id, pin.message)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => deletePin(pin._id)}
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
