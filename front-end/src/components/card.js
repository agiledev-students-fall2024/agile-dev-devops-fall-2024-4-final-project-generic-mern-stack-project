import React from 'react';

function Card({ title, children }) {
  return (
    <div className="bg-purpleLight text-purpleDark shadow-md rounded-lg p-4">
      {title && <h2 className="text-2xl font-bold p-1">{title}</h2>}
      <div className='m-1'>
        {children}
      </div>
    </div>
  );
}

export default Card;
