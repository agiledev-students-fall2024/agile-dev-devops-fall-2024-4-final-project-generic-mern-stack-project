// CompletionModal.jsx
import React from 'react';
import Modal from 'react-modal';

function CompletionModal({ isOpen, onRequestClose, onFileChange, onSubmit, error, closeModalNoImage}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Activity Complete"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <button onClick={onRequestClose} className="close-modal-button">X</button>
      <h2>Recipe Completed!</h2>
      <p>Congratulations on finishing this recipe!</p>
      <form onSubmit={onSubmit}>
        <label>
          Upload an image of your finished dish!
          <input type="file" name="my_files" accept="image/*" onChange={onFileChange} />
        </label>
          {error && <div className = 'upload-error'>{error}</div>}
          <div className='modal-buttons'>
          <button type="submit" className="upload-image-button">Upload Image</button>
          <button onClick={closeModalNoImage} className="upload-no-image-button">Finish Without Uploading</button>
          </div>
      </form>
      
    </Modal>
  );
}

export default CompletionModal;
