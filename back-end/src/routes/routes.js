const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

/**
 * Reads the routes from the JSON file
 * @async
 * @returns {Promise<Object>} The parsed routes data
 */
const getRoutesFromFile = async () => {
    try {
        const filePath = path.join(__dirname, '..', 'data', 'routes.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const parsedData = JSON.parse(fileData);
        return { routes: Array.isArray(parsedData.routes) ? parsedData.routes : [] };
    } catch (error) {
        if (error.code === 'ENOENT') {
            return { routes: [] };
        }
        throw error;
    }
};

/**
 * Writes routes to the JSON file
 * @async
 * @param {Object} data - The data object containing routes array
 */
const writeRoutesToFile = async (data) => {
    try {
        const filePath = path.join(__dirname, '..', 'data', 'routes.json');
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        const routesData = { routes: Array.isArray(data.routes) ? data.routes : [] };
        await fs.writeFile(filePath, JSON.stringify(routesData, null, 2));
    } catch (error) {
        console.error('Error writing routes file:', error);
        throw new Error('Failed to write routes to file');
    }
};

// Get all routes
router.get('/', async (req, res) => {
    try {
        const data = await getRoutesFromFile();
        res.json(data.routes);
    } catch (error) {
        console.error('Error getting routes:', error);
        res.status(500).json({ error: 'Failed to get routes' });
    }
});

// Save new route
router.post('/', async (req, res) => {
    try {
        console.log('Received route data:', req.body);

        const data = await getRoutesFromFile();
        
        const newRoute = {
            id: Date.now().toString(),
            ...req.body,
            date: new Date().toISOString()
        };
        
        data.routes.push(newRoute);
        await writeRoutesToFile(data);
        
        console.log('Route saved successfully:', newRoute);
        res.status(201).json(newRoute);
    } catch (error) {
        console.error('Error saving route:', error);
        res.status(500).json({ error: 'Failed to save route' });
    }
});

// Delete route
router.delete('/:id', async (req, res) => {
    try {
        console.log('Attempting to delete route:', req.params.id);
        
        const data = await getRoutesFromFile();
        const routeIndex = data.routes.findIndex(route => route.id === req.params.id);
        
        if (routeIndex === -1) {
            console.log('Route not found:', req.params.id);
            return res.status(404).json({ error: 'Route not found' });
        }
        
        // Remove the route
        data.routes.splice(routeIndex, 1);
        
        // Save updated routes
        await writeRoutesToFile(data);
        
        console.log('Route deleted successfully:', req.params.id);
        res.json({ message: 'Route deleted successfully' });
    } catch (error) {
        console.error('Error deleting route:', error);
        res.status(500).json({ error: 'Failed to delete route' });
    }
});

module.exports = router;