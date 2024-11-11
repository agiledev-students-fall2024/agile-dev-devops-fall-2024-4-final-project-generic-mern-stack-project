import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Webcam from "react-webcam";
import mapboxgl from 'mapbox-gl';

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

function Post() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Initialize Mapbox map
  useEffect(() => {
    if (!MAPBOX_ACCESS_TOKEN) {
      console.error('Mapbox access token is missing');
      return;
    }

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-73.9967, 40.7312],
      zoom: 12,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    mapRef.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;

      setLongitude(lng.toFixed(6));
      setLatitude(lat.toFixed(6));

      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Add a new marker at the clicked location
      markerRef.current = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([lng, lat])
        .addTo(mapRef.current);
    });

    // Cleanup on unmount
    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => fileInputRef.current.click();

  const handleCaptionChange = (e) => setCaption(e.target.value);

  const handlePostClick = () => {
    console.log("Post clicked.");
    console.log("Caption:", caption);
    console.log("Longitude:", longitude);
    console.log("Latitude:", latitude);
    alert("Post submitted successfully!");
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 1440,
      height: 1080,
    });
    setImage(imageSrc);
  };

  const invalidatePhoto = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className='mx-auto max-w-lg p-4'>
      <h1 className='mb-4 text-center text-2xl font-bold'>
        Report an Incident
      </h1>

      {/* Map Section */}
      <div className="w-full h-64 mb-4 bg-gray-200 rounded">
        <div
          ref={mapContainerRef}
          className="w-full h-full rounded"
        />
      </div>

      {/* Coordinates Form */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Longitude:</label>
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Click on the map to select longitude"
          className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
          readOnly
        />
        <label className="block text-gray-700 mb-2">Latitude:</label>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Click on the map to select latitude"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          readOnly
        />
      </div>

      {/* Image Section */}
      <div className="w-full aspect-[4/3] mb-4 bg-gray-200 rounded flex justify-center items-center">
        {image ? (
          <img
            className="w-full h-full object-cover rounded"
            src={image}
            alt="Captured or Uploaded"
          />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full rounded"
          />
        )}
      </div>

      {/* Capture/Clear Photo Button */}
      {(image && (
        <button
          className="w-full font-semibold text-white py-2 rounded bg-gray-500 hover:bg-gray-700 mb-4"
          onClick={invalidatePhoto}
        >
          Clear Photo
        </button>
      )) || (
          <button
            className="w-full font-semibold text-white py-2 rounded bg-gray-500 hover:bg-gray-700 mb-4"
            onClick={capture}
          >
            Capture Photo
          </button>
        )}

      {/* Upload Photo Section */}
      <div className="image-uploader">
        <button
          className="w-full font-semibold text-white py-2 rounded bg-gray-500 hover:bg-gray-700 mb-4"
          onClick={handleImageClick}
        >
          Upload Photo
        </button>

        <input
          type='file'
          accept='image/*'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
      </div>

      {/* Recents Button (Optional) */}
      <button className='mb-4 w-full rounded border border-gray-300 bg-emerald-800 p-2 hover:bg-gray-600 hover:transition-all'>
        <span className='font-semibold text-white'>
          Recents <FontAwesomeIcon icon='fa-solid fa-caret-down' />
        </span>
      </button>

      {/* Caption Textarea */}
      <textarea
        className="w-full align-top resize-none border border-gray-300 p-2 rounded mb-4"
        rows="3"
        placeholder="Write a caption ..."
        value={caption}
        onChange={handleCaptionChange}
      />

      {/* Post Button */}
      <button
        className='w-full rounded bg-gray-500 py-2 font-semibold text-white hover:bg-gray-700 hover:transition-all'
        onClick={handlePostClick}
      >
        Post
      </button>
    </div>
  );
}

export default Post;
