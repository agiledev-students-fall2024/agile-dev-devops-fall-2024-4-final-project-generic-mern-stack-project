// src/forms/AddActivityForm.js
import React, { useState } from 'react';

const AddActivityForm = () => {
    const [activity, setActivity] = useState({
        id: '',
        name: '',
        description: '',
        locationId: '',
        tripId: '',
        createdBy: '',
        votes: 0,
        price: 'Free',
        image: '',
        comments: [],
        isCompleted: false,
        activityType: 'activities',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActivity((prevActivity) => ({
            ...prevActivity,
            [name]: value,
        }));
    };

    const handleCheckboxChange = () => {
        setActivity((prevActivity) => ({
            ...prevActivity,
            isCompleted: !prevActivity.isCompleted,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit or save activity data
        console.log(activity);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Activity ID:
                <input type="text" name="id" value={activity.id} onChange={handleChange} />
            </label>
            <label>
                Activity Name:
                <input type="text" name="name" value={activity.name} onChange={handleChange} />
            </label>
            <label>
                Description:
                <input type="text" name="description" value={activity.description} onChange={handleChange} />
            </label>
            <label>
                Location ID:
                <input type="text" name="locationId" value={activity.locationId} onChange={handleChange} />
            </label>
            <label>
                Trip ID:
                <input type="text" name="tripId" value={activity.tripId} onChange={handleChange} />
            </label>
            <label>
                Created By (User ID):
                <input type="text" name="createdBy" value={activity.createdBy} onChange={handleChange} />
            </label>
            <label>
                Votes:
                <input type="number" name="votes" value={activity.votes} onChange={handleChange} />
            </label>
            <label>
                Price:
                <select name="price" value={activity.price} onChange={handleChange}>
                    <option value="Free">Free</option>
                    <option value="$">$</option>
                    <option value="$$">$$</option>
                    <option value="$$$">$$$</option>
                    <option value="$$$$">$$$$</option>
                </select>
            </label>
            <label>
                Image URL:
                <input type="text" name="image" value={activity.image} onChange={handleChange} />
            </label>
            <label>
                Is Completed:
                <input type="checkbox" name="isCompleted" checked={activity.isCompleted} onChange={handleCheckboxChange} />
            </label>
            <label>
                Activity Type:
                <select name="activityType" value={activity.activityType} onChange={handleChange}>
                    <option value="food">Food</option>
                    <option value="activities">Activities</option>
                    <option value="stay">Stay</option>
                </select>
            </label>
            <button type="submit">Add Activity</button>
        </form>
    );
};

export default AddActivityForm;
