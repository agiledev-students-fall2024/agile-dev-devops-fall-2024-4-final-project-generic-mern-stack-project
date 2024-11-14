import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddActivityForm from '../components/forms/AddLocationForm';
import './AddLocation.css';
import axios from 'axios';

const AddLocation = () => {
  const { tripId } = useParams();   //this is for later when we want to send that information to the backend and update
                                        //the locations for a certain location
  const navigate = useNavigate();

  const handleFormSubmit = async (loc) => {
    try {
      const locationToCreate = {...loc, tripId: tripId};
      const response = await axios.post('/locations', locationToCreate);

      if(response.status === 201){
        console.log('location added :)');
        navigate(-1);
      }else{console.error('failed to create location...')};
    }catch(error){
      console.error("error creating location :/", error);
    };
  };

  return (
    <div className="add-location-page">
      <AddActivityForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AddLocation;