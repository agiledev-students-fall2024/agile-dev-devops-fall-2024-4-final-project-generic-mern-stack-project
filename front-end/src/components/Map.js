import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import PinModal from './pinModal';
import 'leaflet/dist/leaflet.css';
import '../assets/styles/App.css';
import MapSettings from './MapSettings';
import { ReactComponent as SettingsIcon } from '../assets/images/icons/settings.svg';
import api from '../api';

// custom svg marker
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-icon-container',
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" class="custom-icon">
        <path d="M12 2C8.134 2 5 5.134 5 9c0 6.23 7 13 7 13s7-6.77 7-13c0-3.866-3.134-7-7-7zm0 10.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/>
      </svg>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });
};

const MapComponent = () => {
  const [pins, setPins] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newPinLocation, setNewPinLocation] = useState(null); // coords for new pin
  const [phantomPin, setPhantomPin] = useState(null); // coords for the phantom pin

  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [showPersonalPins, setShowPersonalPins] = useState(false);

  // fetch pins from backend on mount
  useEffect(() => {
    fetchPins();
  }, []);

  const fetchPins = async () => {
    try {
      const response = await api.get('http://localhost:5001/api/pins');
      setPins(response.data);
    } catch (error) {
      console.error('Error fetching pins:', error);
    }
  };

  const fetchUserPins = async () => {
    try {
      const response = await api.get('http://localhost:5001/api/pins/user/123');
      setPins(response.data);
    } catch (error) {
      console.error('Error fetching user pins:', error);
    }
  };

  const toggleSettingsModal = () => {
    setSettingsOpen(!isSettingsOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log('Searching for:', searchQuery);
    // future logic for searching locations will be added here
  };

  const togglePersonalPins = () => {
    setShowPersonalPins(!showPersonalPins);
    if (showPersonalPins) {
      // If toggling off, fetch all pins
      fetchPins();
    } else {
      // If toggling on, fetch only personal pins
      fetchUserPins();
    }
  };


  const handleAddPin = async (message) => {
    const newPin = {
        userId: 123, // handle this using currentuser later
        message: message,
        location: [newPinLocation.lat, newPinLocation.lng],
    };
    try {
        const response = await api.post('/api/pins', newPin);
        setPins([...pins, response.data]); // add new pin from backend response
        setModalOpen(false); 
        setPhantomPin(null); // remove the phantom pin
    } catch (error) {
        console.error('Error adding new pin:', error);
    }
  };

  const handleMapClick = (latlng) => {
    setPhantomPin(latlng); // create the phantom pin on first click
  };

  const handlePhantomPinClick = () => {
    // open modal when the phantom pin is clicked / on second click
    setNewPinLocation(phantomPin); 
    setModalOpen(true); 
  };

  const handleReportPin = (index) => {
    alert(`Reporting pin ${index}`);
  };

  return (


<div className="map-wrapper w-full h-full relative">
      {/* map settings */}
      <button
        onClick={toggleSettingsModal}
        className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-full shadow-md hover:bg-purpleLight">
        <SettingsIcon className="w-6 h-6 text-purpleMedium"
        />
      </button>

      {/* search Bar */}
        <div className="fixed md:absolute bottom-20 md:top-4 left-1/2 transform -translate-x-1/2 
        z-[1000] w-72 h-10 flex items-center ">
            <input
                type="text"
                placeholder="Search for a location..."
                className="w-full h-full p-2 border border-purpleMedium rounded-md focus:outline-none focus:ring-2 focus:ring-purpleDark "
                value={searchQuery}
                onChange={handleSearchChange}
                />
        </div>


      <MapContainer
        center={[40.7309, -73.9973]} // start at wash sq
        zoom={23}
        style={{ height: 'calc(100vh - 95px)', width: '100%' }}
      >
        <MapEvents handleMapClick={handleMapClick} />

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
{pins.map((pin) => (
          <Marker key={pin.id} position={pin.location} icon={createCustomIcon()}>
            <Popup>
              <p className="text-sm text-purpleDark break-words">{pin.message}</p>
            </Popup>
          </Marker>
        ))}

        {/* evntually, render existing pins */}
      

        {/* render phantom pin if it exists */}
        {phantomPin && (
          <Marker
            position={[phantomPin.lat, phantomPin.lng]}
            icon={createCustomIcon()}
            opacity={0.5}
            eventHandlers={{
              click: handlePhantomPinClick, // open the modal on phantom pin click
            }}
          />
        )}
      </MapContainer>

      {/* modal for pin creation */}
      <PinModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleAddPin}
      />

        {/* modal for map settings */}
        {isSettingsOpen && (
            <MapSettings
            isOpen={isSettingsOpen}
            onClose={toggleSettingsModal}
            onTogglePersonal={togglePersonalPins}
            onToggleFriends={() => {}}
            />
        )}

      
    </div>
  );
};

// handle map click
function MapEvents({ handleMapClick }) {
  useMapEvents({
    click(e) {
      handleMapClick(e.latlng);
    },
  });
  return null;
}

export default MapComponent;
