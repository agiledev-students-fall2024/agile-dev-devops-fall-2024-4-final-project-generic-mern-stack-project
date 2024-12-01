import React from 'react';
import { Tldraw } from 'tldraw';
import { useSyncDemo } from '@tldraw/sync';
import 'tldraw/tldraw.css';

const Whiteboard = ({roomId}) => {
    const store = useSyncDemo({roomId: `marconnect-room-id-knowledge-kitchen-agile-480-${roomId}`});
    return (
        <div className='w-full h-full'>
            <Tldraw inferDarkMode store={store}/>
        </div>
    )
}

export default Whiteboard;
