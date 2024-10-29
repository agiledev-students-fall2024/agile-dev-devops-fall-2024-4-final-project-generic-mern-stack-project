import React, { useRef, useState } from 'react';
import Editor from './Editor';
import Quill from 'quill';
import './styles.css';
import './App.css';

const Delta = Quill.import('delta');

const Summary = ({ displaySummary }) => {
  if (displaySummary) {
    return (<div class="summary">
      Connecting to AI summarizer...
    </div>);

  }
  else {
    return <div></div>;
  }
}

const App = () => {
  const [displaySummary, setDisplaySummary] = useState(false);
  const [title, setTitle] = useState('')
  // Use a ref to access the quill instance directly
  const quillRef = useRef();
  const handleOnBlur = () => {
    //saveTitle
  }

  return (
    <div class="main">
      <div class="controls">
        <label>

          <input class="title"
            onBlur={handleOnBlur}
            value={title}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <button
          className="controls-right"
          type="button"
          onClick={() => {
            setDisplaySummary(true);
          }}
        >
          Summarize
        </button>
      </div>

      <Editor
        id="editor"
        ref={quillRef}
      />
      <Summary displaySummary={displaySummary}></Summary>

    </div>
  );
};

export default App;