// a pin description card
import React from 'react';
import Card from './card'; 

function PinCard({ description, onReport }) {
  return (
    <Card width="w-80" height="min-h-20 max-h-auto" >
      <div className="flex flex-col space-y-2">
        <p className="text-sm text-purpleDark break-words">{description}</p>
        <button onClick={onReport} className="text-red-500 hover:underline">
          Report Pin
        </button>
      </div>
    </Card>
  );
}

export default PinCard;


