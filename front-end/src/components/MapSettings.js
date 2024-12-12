import React, { useState, useEffect } from 'react';
import Modal from '../components/modal';
import ToggleButton from '../components/toggle';

function MapSettings({ isOpen, onClose, onTogglePersonal, onToggleFriends }) {
  const [personalView, setPersonalView] = useState(() => {
    const storedValue = sessionStorage.getItem('personalView');
    return storedValue === null ? false : JSON.parse(storedValue);
  });

  const [friendsView, setFriendsView] = useState(() => {
    const storedValue = sessionStorage.getItem('friendsView');
    return storedValue === null ? false : JSON.parse(storedValue);
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handlePersonalToggle = () => {
    const newPersonalView = personalView ? false : true;
    setPersonalView(newPersonalView);
    sessionStorage.setItem('personalView', JSON.stringify(newPersonalView));
    onTogglePersonal(newPersonalView);
  };

  const handleFriendsToggle = () => {
    const newFriendsView = friendsView ? false : true; 
    setFriendsView(newFriendsView);
    sessionStorage.setItem('friendsView', JSON.stringify(newFriendsView));
    onToggleFriends(newFriendsView);
  };
  
  // const [personalView, setPersonalView] = useState(false);
  // const [friendsView, setFriendsView] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');

  // const handlePersonalToggle = () => {
  //   setPersonalView(!personalView);
  //   onTogglePersonal(!personalView);
  // };

  // const handleFriendsToggle = () => {
  //   setFriendsView(!friendsView);
  //   onToggleFriends(!friendsView);
  // };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log('Searching for:', searchQuery);
    // future search logic will go here
  };

  useEffect(() => {
    const handleUnmount = () => {
      sessionStorage.removeItem('personalView');
      sessionStorage.removeItem('friendsView');
      setPersonalView(false);
      setFriendsView(false);
    };

    return handleUnmount;
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Map Settings">
      <div className="p-4 space-y-6">

        <div className="space-y-2">
          <label className="text-purpleDark font-bold">Personal View Change Toggler</label>
          <ToggleButton
            isOn={personalView}
            onToggle={handlePersonalToggle}
          />
        </div>

        <div className="space-y-2">
          <label className="text-purpleDark font-bold">Friends View Change Toggler</label>
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
