import React from 'react';

function Button({ children, onClick }) {
  return (

    <button onClick={onClick} className="bg-purpleMedium hover:bg-purpleDark active:bg-purpleDarker text-white py-2 px-4 rounded font-semibold">
      {children}
    </button>
  ); 
}

export default Button;


