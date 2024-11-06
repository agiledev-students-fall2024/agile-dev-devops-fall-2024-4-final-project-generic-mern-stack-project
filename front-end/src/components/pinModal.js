// a pin creation modal
import React, { useState } from 'react';
import Modal from './modal';
import Button from './button';

function PinModal({ isOpen, onClose, onCreate }) {
  const [pinDescription, setPinDescription] = useState('');

  const handleSubmit = () => {
    onCreate(pinDescription);
    onClose(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Pin">
      <div>
        <textarea
          value={pinDescription}
          onChange={(e) => setPinDescription(e.target.value)}
          placeholder="Enter pin description"
          className="w-full p-2 border rounded"
        />
        <Button
          onClick={handleSubmit}>
          Create Pin
        </Button>
      </div>
    </Modal>
  );
}

export default PinModal;
