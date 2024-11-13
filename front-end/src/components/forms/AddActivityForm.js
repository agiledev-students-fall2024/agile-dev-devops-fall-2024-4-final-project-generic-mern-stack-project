import React, { useState } from 'react';
import './AddActivityForm.css';

const AddActivityForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSubmit({ name, description, price });
    setName('');
    setDescription('');
    setPrice('');
  };

  return (
    <form className="add-activity-form" onSubmit={handleSubmit}>
      <h2>Create Activity</h2>
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
        Description:
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </label>
      <label>
        Price:
        <input 
          type="text" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddActivityForm;
