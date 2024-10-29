import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddActivityForm from '../components/forms/AddActivityForm';
import './AddActivity.css';

const AddActivity = () => {
  const { locationId } = useParams();   //this is for later when we want to send that information to the backend and update
                                        //the activities for a certain location
  const navigate = useNavigate();

  const handleFormSubmit = (activity) => { // this is passed into the form component, edit this once the backend is ready
    console.log('Activity created:', { ...activity, locationId });
    navigate(-1); // this is cool, just navigates to prev. page
  };

  return (
    <div className="add-activity-page">
      <AddActivityForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AddActivity;
