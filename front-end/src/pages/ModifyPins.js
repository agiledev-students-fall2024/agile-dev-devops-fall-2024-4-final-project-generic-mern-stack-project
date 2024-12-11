import React, { useContext, useState } from 'react';
import { PinContext } from '../PinContext';
import '../assets/styles/ModifyPins.css';


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


  return (
    <div className="pin-list-container">
    <h1 className="title">Modify Your Pins</h1>
    <div className="pin-list">
      {pins.map((pin) => (
        <div className="pin-item" key={pin._id}>
          {editPinId === pin._id ? (
            <div className="edit-mode">
              <textarea
                className="textarea"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows="3"
              />
              <div className="action-buttons">
                <button
                  className="button edit-button"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="delete-button"
                  onClick={() => setEditPinId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="pin-description">{pin.message}</p>
              <div className="action-buttons">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(pin._id, pin.message)}
                >
                  Edit
                </button>
                <button
                  className="button delete-button"
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
