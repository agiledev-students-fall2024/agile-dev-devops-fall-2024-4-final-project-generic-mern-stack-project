import React from 'react';
import { Tldraw } from 'tldraw';
import { useSyncDemo } from '@tldraw/sync';
import 'tldraw/tldraw.css';

const Whiteboard = () => {
    /*
    Any Browser with the same roomId will go into the same whiteboard collab
    Currently hardcoded for now
    Also will need to make private room (move away from useSyncDemo)
    */
    const store = useSyncDemo({roomId: 'marconnect-room-id-knowledge-kitchen-agile-480'});
    return (
        <div className='w-full h-full'>
            <Tldraw inferDarkMode store={store}/>
        </div>
    )
}

export default Whiteboard;
