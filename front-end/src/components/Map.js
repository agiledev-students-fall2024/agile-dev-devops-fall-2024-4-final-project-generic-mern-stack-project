import React, {useContext, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import PinModal from './pinModal';
import 'leaflet/dist/leaflet.css';
import '../assets/styles/App.css';
import MapSettings from './MapSettings';
import { ReactComponent as SettingsIcon } from '../assets/images/icons/settings.svg';
import { PinContext } from '../PinContext';

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

function InitializeMap({ setMap }) {
  const map = useMap(); // Access the map instance
  React.useEffect(() => {
    if (map) {
      console.log("Map instance created via useMap:", map); // Debug log
      setMap(map); // Pass the map instance to the state
    }
  }, [map]);
  return null;
}


const MapComponent = () => {

  const {pins, addPin} = useContext(PinContext)
  const [isModalOpen, setModalOpen] = useState(false);
  const [newPinLocation, setNewPinLocation] = useState(null); // coords for new pin
  const [phantomPin, setPhantomPin] = useState(null); // coords for the phantom pin

  const [mapCenter, setMapCenter] = useState([40.7309, -73.9973]); // Default starting center
  const [map, setMap] = useState(null);


  const [isSettingsOpen, setSettingsOpen] = useState(false);


  const [showPersonalPins, setShowPersonalPins] = useState(false);

  const toggleSettingsModal = () => {
    setSettingsOpen(!isSettingsOpen);
  };

  const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);

const handleSearchChange = async (e) => {
  setSearchQuery(e.target.value);
  console.log('Searching for:', searchQuery);
  

  if (e.target.value.length > 2) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${e.target.value}&format=json&addressdetails=1&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
      console.log('Results:', searchResults);
    } catch (error) {
      console.error('Error fetching geocode data:', error);
    }
  } else {
    setSearchResults([]);
  }
};



  const togglePersonalPins = () => {
    setShowPersonalPins(!showPersonalPins);
  };

  const filteredPins = showPersonalPins ? pins.filter((pin) => pin.userId === 123): pins; //Replace 123 with actual userId logic

  const currentUser = null; 
  const handleAddPin = async (message) => {
    const newPin = {
      userId: currentUser || null,
      message: message,
      location: [newPinLocation.lat, newPinLocation.lng],
    };
  
    try {
      await addPin(newPin);
      // setPins((prevPins) => [...prevPins, response.data]);
  
      // Reset modal and phantom pin state
      setModalOpen(false);
      setPhantomPin(null);
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

     {/* Search Bar */}
     <div
      className="fixed md:absolute bottom-20 md:top-4 left-1/2 transform -translate-x-1/2 
        z-[1000] w-72 h-10 flex flex-col items-center relative"
    >
      <input
        type="text"
        placeholder="Search for a location..."
        className="w-full h-10 p-2 border border-purpleMedium rounded-md focus:outline-none focus:ring-2 focus:ring-purpleDark"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {searchResults.length > 0 && (
        <ul
          className="absolute top-12 bg-white border border-gray-300 w-full rounded-md shadow-md max-h-40 overflow-auto z-[1000] divide-y divide-gray-200"
        >
          {searchResults.map((result, index) => (
            <li
              key={index}
              className="p-2 hover:bg-purpleLight cursor-pointer text-sm text-gray-700 flex items-start leading-snug"
              onClick={() => {
                setSearchResults([]); // Clear results first
                if (map) {
                    map.flyTo([parseFloat(result.lat), parseFloat(result.lon)], 23);
                } else {
                    console.error("Map instance is not defined.");
                }
            }}
            
            >
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>



      <MapContainer
      key={pins.length}
        center={mapCenter}
        zoom={23}
        style={{ height: 'calc(100vh - 95px)', width: '100%' }}
        whenCreated={(mapInstance) => {
          console.log("Map instance created:", mapInstance);
          setMap(mapInstance);
        }}
      >
        <MapEvents handleMapClick={handleMapClick}/>

        <InitializeMap setMap={setMap} />



        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

{filteredPins.map((pin) => (
          <Marker key={pin._id} position={pin.location} icon={createCustomIcon()}>
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
