import { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { SearchBox } from '@mapbox/search-js-react';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {
  const mapContainerRef = useRef();
  const mapInstanceRef = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_API_KEY;

    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/en1135/cm2rtczub00dm01qi9phsddid', // style URL
      center: [-73.9967, 40.7312], // starting position [lng, lat]
      zoom: 13.5, // starting zoom
    });

    // add navigation control
    mapInstanceRef.current.addControl(new mapboxgl.NavigationControl());

    // add mapbox directions
    mapInstanceRef.current.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/cycling',
      }),
      'top-left',
    );

    mapInstanceRef.current.on('load', () => {
      setMapLoaded(true);
    });
  }, []);

  return (
    <>
      <SearchBox
        accessToken={process.env.REACT_APP_API_KEY}
        map={mapInstanceRef.current}
        mapboxgl={mapboxgl}
        value={inputValue}
        onChange={(d) => {
          setInputValue(d);
        }}
        marker
      />
      <div id="map-container" className="h-94 w-full" ref={mapContainerRef} />
    </>
  );
}
export default Map;
