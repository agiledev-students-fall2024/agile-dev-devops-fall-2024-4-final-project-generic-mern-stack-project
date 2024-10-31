import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTrip.css';

const AddTrip = () => {
  const navigate = useNavigate();
  const [tripData, setTripData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    setTripData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Trip created:', tripData);
    navigate('/'); // Navigate back to home page after submission
  };

  return (
    <div className="add-trip-page">
      <h2>Create New Trip</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Trip Name:
          <input
            type="text"
            name="name"
            value={tripData.name}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>Start Date:
          <input
            type="date"
            name="startDate"
            value={tripData.startDate}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>End Date:
          <input
            type="date"
            name="endDate"
            value={tripData.endDate}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>Description:
          <textarea
            name="description"
            value={tripData.description}
            onChange={handleInputChange}
            placeholder="Describe your trip..."
            rows="4"
          />
        </label>

        <label>Upload Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>

        <button type="submit">Create Trip</button>
      </form>
    </div>
  );
};

export default AddTrip;
