import React from 'react';



function Button({ children, onClick }) {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClick} // Attach onClick prop here
        >
            {children}
        </button>
    );
}

export default Button;

