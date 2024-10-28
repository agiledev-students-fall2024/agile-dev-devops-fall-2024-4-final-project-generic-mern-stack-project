// src/forms/CreateTripForm.js
import React, { useState } from 'react';

const TripForm = () => {
    const [trip, setTrip] = useState({
        id: '',
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        participants: [],
        locations: [],
        status: 'upcoming',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrip((prevTrip) => ({
            ...prevTrip,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit or save trip data
        console.log(trip);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Trip ID:
                <input type="text" name="id" value={trip.id} onChange={handleChange} />
            </label>
            <label>
                Trip Name:
                <input type="text" name="name" value={trip.name} onChange={handleChange} />
            </label>
            <label>
                Description:
                <input type="text" name="description" value={trip.description} onChange={handleChange} />
            </label>
            <label>
                Start Date:
                <input type="date" name="startDate" value={trip.startDate} onChange={handleChange} />
            </label>
            <label>
                End Date:
                <input type="date" name="endDate" value={trip.endDate} onChange={handleChange} />
            </label>
            <label>
                Participants:
                <input type="text" name="participants" value={trip.participants.join(', ')} onChange={handleChange} />
            </label>
            <label>
                Locations:
                <input type="text" name="locations" value={trip.locations.join(', ')} onChange={handleChange} />
            </label>
            <label>
                Status:
                <select name="status" value={trip.status} onChange={handleChange}>
                    <option value="completed">Completed</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="upcoming">Upcoming</option>
                </select>
            </label>
            <button type="submit">Save Trip</button>
        </form>
    );
};

export default TripForm;
