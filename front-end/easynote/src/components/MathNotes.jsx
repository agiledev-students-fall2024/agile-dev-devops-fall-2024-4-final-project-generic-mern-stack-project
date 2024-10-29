import React from 'react';

const MathNotes = () => {
  return (
    <section className="math-view">
      <h1 className="page-title">Math</h1>
      
      <div className="note-editor">
        <div className="notes-header">
          <h2 className="notes-title">Combo</h2>
          <button className="share-button">share</button>
        </div>
        <div className="note-content">
          I love counting things.
        </div>
      </div>
    </section>
  );
};

export default MathNotes;