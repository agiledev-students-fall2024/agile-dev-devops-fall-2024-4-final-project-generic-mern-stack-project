import React from 'react';

function button({ text }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded">
      {text}
    </button>
  );
}

export default button;


<button className="bg-primary hover:bg-secondary text-white font-bold py-10 px-20 rounded">
  Click Me
</button>
