import React, { useState, useEffect, useRef } from 'react';
import PinCard from './pinCard';
import { ReactComponent as PinIcon } from '../assets/images/icons/pin.svg';  // import the SVG as react component

function PinCreation({ description, x, y, onReport }) {
  const [isCardOpen, setCardOpen] = useState(false);
  const cardRef = useRef(null);

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setCardOpen(false);  // close the card if clicked outside
    }
  };

  useEffect(() => {
    if (isCardOpen) {
      document.addEventListener('mousedown', handleClickOutside);  // add event listener when card opens
    } else {
      document.removeEventListener('mousedown', handleClickOutside);  // remove event listener when card closes
    }
    
    // clean up listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCardOpen]);

  const handleClick = () => {
    setCardOpen(!isCardOpen);  // toggle card open/close
  };

  return (
    <div style={{ position: 'absolute', top: y, left: x, zIndex: 9999 }}>
      {/* Pin SVG */}
      <PinIcon 
        onClick={handleClick} 
        className="cursor-pointer w-6 h-6 text-purpleMedium hover:text-purpleDark transition-colors duration-300 z-[9999]" 
      />
      
      {/* when pin is clicked */}
      {isCardOpen && (
        <div ref={cardRef} 
        className="absolute transform -translate-x-1/2 -translate-y-full mt-2"
        style={{position: 'absolute', top: '-10px', left: '50%', zIndex: 9999 }}>
          <PinCard description={description} onReport={onReport} />
        </div>
      )}
    </div>
  );
}

export default PinCreation;
