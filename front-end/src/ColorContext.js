import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    const [color, setColor] = useState('');

    // Function to update the color
    const updateColor = (newColor) => {
        setColor(newColor);
    };

    return (
        <ColorContext.Provider value={{ color, updateColor }}>
            {children}
        </ColorContext.Provider>
    );
};
