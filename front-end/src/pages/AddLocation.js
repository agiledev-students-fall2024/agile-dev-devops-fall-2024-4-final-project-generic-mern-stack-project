import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddActivityForm from '../components/forms/AddLocationForm';
import './AddLocation.css';

const AddLocation = () => {
  const { tripId } = useParams();   //this is for later when we want to send that information to the backend and update
                                        //the locations for a certain location
  const navigate = useNavigate();

  const handleFormSubmit = (loc) => { // this is passed into the form component, edit this once the backend is ready
    console.log('Location created:', { ...loc, tripId });
    navigate(-1); // this is cool, just navigates to prev. page
  };

  return (
    <div className="add-location-page">
      <AddActivityForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AddLocation;