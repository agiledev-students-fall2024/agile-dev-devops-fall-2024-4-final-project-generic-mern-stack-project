import React, { useState } from 'react';
import Modal from '../components/modal';
import ToggleButton from '../components/toggle';

function MapSettings({ isOpen, onClose, onTogglePersonal, onToggleFriends }) {
  const [personalView, setPersonalView] = useState(false);
  const [friendsView, setFriendsView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePersonalToggle = () => {
    setPersonalView(!personalView);
    onTogglePersonal(!personalView);
  };

  const handleFriendsToggle = () => {
    setFriendsView(!friendsView);
    onToggleFriends(!friendsView);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log('Searching for:', searchQuery);
    // future search logic will go here
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Map Settings">
      <div className="p-4 space-y-6">

        <div className="space-y-2">
          <label className="text-purpleDark font-bold">Personal View</label>
          <ToggleButton
            isOn={personalView}
            onToggle={handlePersonalToggle}
          />
        </div>

        <div className="space-y-2">
          <label className="text-purpleDark font-bold">Friends View</label>
          <ToggleButton
            isOn={friendsView}
            onToggle={handleFriendsToggle}
          />
        </div>
      </div>
    </Modal>
  );
}

export default MapSettings;
