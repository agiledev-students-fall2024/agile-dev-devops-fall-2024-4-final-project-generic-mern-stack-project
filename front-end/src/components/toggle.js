import React from 'react';

function ToggleButton({ isOn, onToggle }) {
  return (
    <div
      className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 
        ${isOn ? 'bg-purpleMedium' : 'bg-gray-300'}`}
      onClick={onToggle}>
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300
          ${isOn ? 'translate-x-8' : 'translate-x-0'}`}/>
    </div>
  );
}

export default ToggleButton;
