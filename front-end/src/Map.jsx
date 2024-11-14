import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { FaSave } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa';
import { API_URL } from './config/api';


const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
// const API_URL = 'http://localhost:3001/api';

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

function Map() {
  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const directionsRef = useRef(null);
  const [routeData, setRouteData] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [isLoadingSavedRoute, setIsLoadingSavedRoute] = useState(false);

  const reportIncident = () => {
    navigate('/post');
  };

  const saveRoute = async () => {
    if (!routeData) {
      setSaveStatus('No route to save');
      return;
    }

    try {
      setIsSaving(true);

      // Debug logging
      console.log('Route Data:', routeData);

      if (!routeData.legs || !routeData.legs[0]) {
        setSaveStatus('Invalid route data - no route legs found');
        return;
      }

      // Get the waypoints from the first leg; Not able to add from accessing geometry 
      const startPoint = routeData.legs[0].steps[0];
      const endPoint = routeData.legs[0].steps[routeData.legs[0].steps.length - 1];

      // Create route object for storage with validated data
      const newRoute = {
        name: `${startPoint.name || 'Start'} to ${endPoint.name || 'End'}`,
        start_location: startPoint.name || 'Start',
        end_location: endPoint.name || 'End',
        distance: routeData.distance || 0,
        duration: routeData.duration || 0,
        geometry: routeData.geometry || null,
        steps: routeData.legs[0].steps || [],
        origin: {
          place_name: startPoint.name || 'Start',
          geometry: {
            type: "Point",
            coordinates: [
              startPoint.maneuver.location[0],
              startPoint.maneuver.location[1]
            ]
          }
        },
        destination: {
          place_name: endPoint.name || 'End',
          geometry: {
            type: "Point",
            coordinates: [
              endPoint.maneuver.location[0],
              endPoint.maneuver.location[1]
            ]
          }
        }
      };

      // Debug logging
      console.log('Attempting to save route:', newRoute);

      // Make the API request
      const response = await fetch(`${API_URL}/routes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRoute)
      });

      // Log response status for debugging
      console.log('Response status:', response.status);

      // Handle non-ok responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Failed to save route');
      }

      const savedRoute = await response.json();
      console.log('Route saved successfully:', savedRoute);

      setSaveStatus('Route saved successfully!');

      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error saving route:', error);
      setSaveStatus(`Error saving route: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };


  const loadSavedRoute = async (route) => {
    try {
      setIsLoadingSavedRoute(true);

      if (directionsRef.current) {
        // Set origin and destination using the coordinates from the saved route
        directionsRef.current.setOrigin(route.origin.geometry.coordinates);
        directionsRef.current.setDestination(route.destination.geometry.coordinates);

        // Fit the map to show the full route
        if (mapInstanceRef.current && route.geometry) {
          const bounds = new mapboxgl.LngLatBounds();

          // Add origin and destination to bounds
          bounds.extend(route.origin.geometry.coordinates);
          bounds.extend(route.destination.geometry.coordinates);

          // Add all step locations to bounds
          if (route.steps) {
            route.steps.forEach(step => {
              if (step.maneuver && step.maneuver.location) {
                bounds.extend(step.maneuver.location);
              }
            });
          }

          mapInstanceRef.current.fitBounds(bounds, {
            padding: 100,
            duration: 1000
          });
        }
      }
    } catch (error) {
      console.error('Error loading saved route:', error);
      setMapError('Error loading saved route');
    } finally {
      setIsLoadingSavedRoute(false);
    }
  };

  useEffect(() => {
    if (!MAPBOX_ACCESS_TOKEN) {
      setMapError('Mapbox access token is missing');
      return;
    }

    try {
      mapInstanceRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/en1135/cm2rtczub00dm01qi9phsddid', // style URL
        center: [-73.9967, 40.7312],
        zoom: 13.5,
      });

      mapInstanceRef.current.addControl(
        new mapboxgl.NavigationControl(),
        'bottom-right'
      );

      directionsRef.current = new MapboxDirections({
        accessToken: MAPBOX_ACCESS_TOKEN,
        unit: 'metric',
        profile: 'mapbox/cycling',
        alternatives: true,
        controls: {
          inputs: true,
          instructions: true,
          profileSwitcher: false
        },
        interactive: true
      });

      mapInstanceRef.current.addControl(directionsRef.current, 'top-left');

      // Listen for route updates
      directionsRef.current.on('route', (e) => {
        if (e.route && e.route[0]) {
          setRouteData(e.route[0]);
          setSaveStatus('');
          console.log('New route data:', e.route[0]);
        }
      });

      mapInstanceRef.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Error loading map');
      });

      // Load saved route if available
      mapInstanceRef.current.on('load', () => {
        const selectedRoute = localStorage.getItem('selectedRoute');
        if (selectedRoute) {
          const route = JSON.parse(selectedRoute);
          loadSavedRoute(route);
          localStorage.removeItem('selectedRoute');
        }
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Error initializing map');
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  return (
    <div className='relative h-screen'>
      {mapError ? (
        <div className="h-full flex items-center justify-center bg-gray-100">
          <div className="text-red-600 text-center p-4">
            <p className="text-xl font-bold">Error</p>
            <p>{mapError}</p>
            <p className="text-sm mt-2">Please check your Mapbox configuration</p>
          </div>
        </div>
      ) : (
        <>
          <div id='map-container' className='h-94 w-full' ref={mapContainerRef} />

          {/* Controls */}
          {/* <div className='absolute top-4 right-12 bg-white p-4 rounded shadow-lg space-y-2'> */}
          <div className='absolute bottom-16 left-12 bg-white p-4 rounded shadow-lg space-y-2 max-w-md'>
            {routeData && (
              <button
                onClick={saveRoute}
                disabled={isSaving || isLoadingSavedRoute}
                className={`w-full ${
                  isSaving || isLoadingSavedRoute
                    ? 'bg-gray-400'
                    : 'bg-green-500 hover:bg-green-600'
                  } text-white px-4 py-2 rounded flex items-center justify-center gap-2`}
              >
                <FaSave />
                {isSaving ? 'Saving...' : 'Save Route'}
              </button>
            )}
            {saveStatus && (
              <div className={`text-center p-2 rounded ${
                saveStatus.includes('Error') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}>
                {saveStatus}
              </div>
            )}
          </div>

          <div className='absolute bottom-16 right-12 bg-white p-4 rounded shadow-lg'>
            <button
              onClick={reportIncident}
              className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2'
            >
              <FaExclamationTriangle />
              Report Incident
            </button>
          </div>

          {/* Route info */}

          {/* {routeData && (
            <div className='absolute bottom-16 left-12 bg-white p-4 rounded shadow-lg max-w-md'>
              <h3 className='font-bold mb-2'>Route Information:</h3>
              <p>Distance: {(routeData.distance / 1000).toFixed(2)} km</p>
              <p>Duration: {Math.round(routeData.duration / 60)} minutes</p>
              <p className="mb-2">Steps: {routeData.legs[0].steps.length}</p> */}

          {/* Directions list */}
          {/* <div className="mt-4 max-h-48 overflow-y-auto">
                <h4 className="font-semibold mb-2">Turn-by-turn directions:</h4>
                <ol className="list-decimal list-inside space-y-2">
                  {routeData.legs[0].steps.map((step, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {step.maneuver.instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )} */}
        </>
      )}
    </div>
  );
}

export default Map;