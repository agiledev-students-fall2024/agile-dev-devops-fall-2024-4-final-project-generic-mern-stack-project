import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
// Editor is an uncontrolled React component
const Editor = forwardRef(
    ({ }, ref) => {
        const containerRef = useRef(null);

        useEffect(() => {
            const container = containerRef.current;
            const editorContainer = container.appendChild(
                container.ownerDocument.createElement('div'),
            );
            const quill = new Quill(editorContainer, {
                theme: 'snow',
            });

            ref.current = quill;


            return () => {
                ref.current = null;
                container.innerHTML = '';
            };
        }, [ref]);

        return <div ref={containerRef}></div>;
    },
);

Editor.displayName = 'Editor';

export default Editor;