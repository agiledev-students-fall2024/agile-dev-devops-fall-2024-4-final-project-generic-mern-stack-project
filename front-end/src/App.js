import React, { useState } from 'react';
import '../src/assets/styles/App.css';

function App() {
  const [scale, setScale] = useState(1);

  const handleZoom = (event) => {
    const zoomFactor = event.deltaY < 0 ? 0.1 : -0.1;
    setScale((prevScale) => Math.max(1, prevScale + zoomFactor));
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <img src="../src/assets/images/logo.svg" alt="Logo" className="logo" />
        <button className="hamburger-menu" onClick={() => alert('Menu clicked!')}>
          &#9776;
        </button>
      </header>

      {/* Map Section */}
      <section className="map-container">
        <div className="map-settings">
          <button>Map Settings</button>
        </div>
        <div className="map" onWheel={handleZoom}>
          <img
            src = "front-end/src/map.png"
            alt="Map"
            className="zoomable-map"
            style={{ transform: `scale(${scale})` }}
          />
        </div>
      </section>
    </div>
  );
}

export default App;


