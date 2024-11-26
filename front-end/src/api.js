import axios from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001',    
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to get user settings by username
export const getUserSettings = async (username) => {
    try {
        const response = await api.get(`/user/settings/${username}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user settings:", error);
        throw error;
    }
};


// Function to update user settings
export const updateUserSettings = async (username, settings) => {
    try {
        const response = await api.put(`/user/settings/${username}`, settings);
        return response.data;
    } catch (error) {
        console.error("Error updating user settings:", error);
        throw error;
    }
};

export default api;


