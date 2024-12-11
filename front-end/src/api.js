import axios from 'axios';

// Create an axios instance with the correct base URL
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/api', // Ensure /api prefix is included
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
});

// Function to get user settings
export const getUserSettings = async (username) => {
    try {
        console.log(`GET request to /users/${username}`); // Debug log
        const response = await api.get(`/users/${username}`); // Ensure /users endpoint
        return response.data;
    } catch (error) {
        console.error('Error in getUserSettings API:', error); // Debug log for errors
        throw error;
    }
};

// Function to update user settings
export const updateUserSettings = async (username, settings) => {
    try {
        console.log(`PUT request to /users/${username}`, settings); // Debug log
        const response = await api.put(`/users/${username}`, settings); // Ensure /users endpoint
        return response.data;
    } catch (error) {
        console.error('Error in updateUserSettings API:', error); // Debug log for errors
        throw error;
    }
};

export default api;

