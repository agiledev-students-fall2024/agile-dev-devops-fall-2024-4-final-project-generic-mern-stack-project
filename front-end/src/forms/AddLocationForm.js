// src/forms/AddLocationForm.js
import React, { useState } from 'react';

const AddLocationForm = () => {
    const [location, setLocation] = useState({
        tripId: '',
        id: '',
        name: '',
        address: '',
        activities: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocation((prevLocation) => ({
            ...prevLocation,
            [name]: value,
        }));
    };

    const handleActivitiesChange = (e) => {
        const { value } = e.target;
        setLocation((prevLocation) => ({
            ...prevLocation,
            activities: value.split(',').map((activity) => activity.trim()),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit or save location data
        console.log(location);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Trip ID:
                <input type="text" name="tripId" value={location.tripId} onChange={handleChange} />
            </label>
            <label>
                Location ID:
                <input type="text" name="id" value={location.id} onChange={handleChange} />
            </label>
            <label>
                Location Name:
                <input type="text" name="name" value={location.name} onChange={handleChange} />
            </label>
            <label>
                Address (optional):
                <input type="text" name="address" value={location.address} onChange={handleChange} />
            </label>
            <label>
                Activities (comma-separated IDs):
                <input type="text" name="activities" value={location.activities.join(', ')} onChange={handleActivitiesChange} />
            </label>
            <button type="submit">Add Location</button>
        </form>
    );
};

export default AddLocationForm;
