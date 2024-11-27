import React, { useState } from 'react';
import './AddLocationForm.css';

const AddLocationForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, address }); // call parent’s submit function (passed in as a prop)
    setName(''); // clear the inputs
    setAddress(''); 
  };

  return (
    <form className="add-location-form" onSubmit={handleSubmit}>
      <h2>Create Location</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Address:
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddLocationForm;
