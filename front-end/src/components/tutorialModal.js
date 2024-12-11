import React, { useEffect, useState } from 'react';
import Modal from './modal';
import Button from './button';

const TutorialModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the tutorial has been dismissed before
    const tutorialDismissed = localStorage.getItem('tutorialDismissed');
    if (!tutorialDismissed) {
      setIsOpen(true); // Open modal if not dismissed
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('tutorialDismissed', 'true'); // Save dismissal status
    setIsOpen(false); // Close modal
  };

  const handleClose = () => {
    setIsOpen(false); // Close modal for current session
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Welcome to While We Were Dreaming">
      <p> 
        Here's how to get started:
      </p>
      <br></br>
      <ol className="text-sm list-decimal list-inside my-4 space-y-2">
        <li>• Use the map to explore pins and create your own memories.</li>
        <li>• Click on a pin to view details or report inappropriate content.</li>
        <li>• Use the search bar to locate specific places and events.</li>
        <li>• Customize your experience through map settings.</li>
      </ol>
      <br></br>
      <p className="text-sm">
        Enjoy creating your story and connecting with others' journeys.
      </p>
      <div className="flex justify-center mt-4 space-x-2">
        <Button onClick={handleDismiss}>
        Do Not Show Again
        </Button>
      </div>
    </Modal>
  );
};

export default TutorialModal;
