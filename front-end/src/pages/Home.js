import React, { useState } from 'react';
import '../assets/styles/App.css';
import map from '../assets/images/map.png';
import Button from '../components/button';

/**
 * A React component that represents a single page of the app.
 * Use this file to create new pages as needed.
 * Don't forget to add the new route to App.js.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */

const Home = (props) => {
  const [scale, setScale] = useState(1);

  const handleZoom = (event) => {
    const zoomFactor = event.deltaY < 0 ? 0.1 : -0.1;
    setScale((prevScale) => Math.max(1, prevScale + zoomFactor));
  };

  return (
    <div className="App">

      {/* Map Section */}
      <section className="map-container">
        <div className="map-settings">
          <Button>Map Settings</Button>
        </div>


        <div className="map" onWheel={handleZoom}>
          <img
            src={map}
            alt="Map"
            className="zoomable-map"
            style={{ transform: `scale(${scale})` }}
          />
        </div>
      </section>
    </div>
  );
};

// make this component available to be imported into any other file
export default Home;
