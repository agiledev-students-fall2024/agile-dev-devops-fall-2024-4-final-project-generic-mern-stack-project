import React, { useContext, useState } from 'react';
import { PinContext } from '../PinContext';
import '../assets/styles/ModifyPins.css';
import Modal from '../components/modal'; // Assume Modal component is available

const ModifyPins = () => {
  const { pins, updatePin, deletePin } = useContext(PinContext);

  const [editPinId, setEditPinId] = useState(null);
  const [newDescription, setNewDescription] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [pinToDelete, setPinToDelete] = useState(null);

  const handleEdit = (id, description) => {
    setEditPinId(id);
    setNewDescription(description);
  };

  const handleSave = () => {
    if (editPinId) {
      updatePin(editPinId, newDescription);
      setEditPinId(null);
      setNewDescription('');
      setShowViewModal(true); // Show "View on Map" modal after saving
    }
  };

  const handleDeleteConfirmation = (id) => {
    setShowDeleteModal(true);
    setPinToDelete(id);
  };

  const handleDelete = () => {
    deletePin(pinToDelete);
    setShowDeleteModal(false);
    setPinToDelete(null);
  };

  const handleViewOnMap = () => {
    window.location.href = '/home'; // Redirect to the map page
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
                  <button className="button edit-button" onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className="button cancel-button"
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
                    className="delete-button"
                    onClick={() => handleDeleteConfirmation(pin._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
      >
        <p>Are you sure you want to delete this pin?</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* View on Map Modal */}
      {/* View on Map Modal */}
<Modal
  isOpen={showViewModal}
  onClose={() => setShowViewModal(false)}
  title="View Pin on Map"
>
  <p>Your pin has been modified! Would you like to view it on the map?</p>
  <div className="flex justify-end gap-2">
    <button
      className="px-4 py-2 rounded"
      style={{
        backgroundColor: "black",
        color: "white",
        fontWeight: "bold",
        border: "1px solid white",
        cursor: "pointer",
      }}
      onClick={handleViewOnMap}
    >
      Yes
    </button>
    <button
      className="px-4 py-2 bg-gray-300 rounded"
      onClick={() => setShowViewModal(false)}
    >
      No
    </button>
  </div>
</Modal>

    </div>
  );
};

export default ModifyPins;