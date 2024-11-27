import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddTrip.css';
import axios from 'axios';

const AddTrip = () => {
  const { userId } = useParams(); // note that the params haven't been put in yet
  //so this won't work until then
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

  const handleFormSubmit = async (tripData) => {
    try{
      const newTrip = {...tripData, userId: userId};
      const response = await axios.post('/trips', newTrip);

      if (response.status === 201){
        console.log("added a trip :)", response.data);
        navigate(-1);
      }else{console.error("failed to add activity :(")};
    }catch(error){
      console.error("error creating trip", error);
    };
  };

  return (
    <div className="add-trip-page">
      <h2>Create New Trip</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit(tripData);
      }}>
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

        {/* sorry @aditi commenting this out for now until we are ready to implement it */}
        {/* <label>Upload Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label> */}
      

        <button type="submit">Create Trip</button>
      </form>
    </div>
  );
};

export default AddTrip;
