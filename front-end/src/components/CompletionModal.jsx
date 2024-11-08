// CompletionModal.jsx
import React from 'react';
import Modal from 'react-modal';

function CompletionModal({ isOpen, onRequestClose, onFileChange, onSubmit, error }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Activity Complete"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Recipe Completed!</h2>
      <p>Congratulations on finishing this recipe!</p>
      <form onSubmit={onSubmit}>
        <label>
          Upload an image of your finished dish!
          <input type="file" name="my_files" accept="image/*" onChange={onFileChange} />
        </label>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" className="upload-image-button">Upload Image</button>
      </form>
      <button onClick={onRequestClose} className="close-modal-button">Close</button>
    </Modal>
  );
}

export default CompletionModal;
