import React from 'react';

function Card({ title, children, width = '', height = ''}) {
  return (
    <div className={`bg-purpleLight text-purpleDark p-4 rounded-lg shadow-lg ${width} ${height} overflow-auto`}>
      {title && <h2 className="text-2xl font-bold p-1">{title}</h2>}
      <div className='m-1'>
        {children}
      </div>
    </div>
  );
}

export default Card;
