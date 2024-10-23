import React from 'react';

function Button({ children }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {children}
    </button>
  );
}

export default Button;


//<button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded">
 // Click Me
// </button>
