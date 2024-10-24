import React from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

const Whiteboard = () => {
    return (
        <div className='w-full h-full'>
            <Tldraw inferDarkMode />
        </div>
    )
}

export default Whiteboard;
