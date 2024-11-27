import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddActivityForm from '../components/forms/AddActivityForm';
import './AddActivity.css';
import axios from 'axios';

const AddActivity = () => {
  const { locationId } = useParams();   //this is for later when we want to send that information to the backend and update
                                        //the activities for a certain location
  const navigate = useNavigate();

  const handleFormSubmit = async (activity) => { // this is passed into the form component, edit this once the backend is ready
    try {
      const act = {...activity, locationId: locationId}; //add the location ID to the post request
      
      //shouldn't this have the tripId as well?

      const response = await axios.post('/activities', act); //this is the api call
      if(response.status === 201){
        console.log("successfully added activity :)", response.data);
        navigate(-1); // this is cool, just navigates to prev. page
      }else{
        console.error('Failed to add activity');
      }
    } catch (error){
      console.error("error adding activity", error);
    }
  };

  return (
    <div className="add-activity-page">
      <AddActivityForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AddActivity;
