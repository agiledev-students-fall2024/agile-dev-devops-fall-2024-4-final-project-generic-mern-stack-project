const restaurants = require('./restaurants.json');
const express = require("express");
require("dotenv").config({ silent: true });
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/restaurants', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      cuisine,
      neighborhood,
    } = req.query;

    // Convert page and limit to integers
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);

    // Convert cuisine and neighborhood to arrays
    const cuisineArray = cuisine ? cuisine.split(',').map(c => c.toLowerCase()) : [];
    const neighborhoodArray = neighborhood ? neighborhood.split(',').map(n => n.toLowerCase()) : [];
    // Filter restaurants based on cuisine, neighborhood, and search query
    let filteredRestaurants = restaurants;

    if (cuisineArray.length > 0) {
      filteredRestaurants = filteredRestaurants.filter(restaurant =>
        restaurant?.cuisine && cuisineArray.includes(restaurant.cuisine.toLowerCase())
      );
    }

    if (neighborhoodArray.length > 0) {
      filteredRestaurants = filteredRestaurants.filter(restaurant =>
        restaurant?.neighborhood && neighborhoodArray.includes(restaurant.neighborhood.toLowerCase())
      );
    }

    // Implement pagination
    const startIndex = (pageInt - 1) * limitInt;
    const endIndex = pageInt * limitInt;
    const paginatedRestaurants = filteredRestaurants.slice(startIndex, endIndex);

    res.json({
      total: filteredRestaurants.length,
      page: pageInt,
      limit: limitInt,
      data: paginatedRestaurants,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching restaurants');
  }
});

// Like a restaurant
app.post('/restaurant/:id/like', (req, res) => {
  const restaurantId = req.params.id;
  console.log(`Restaurant ${restaurantId} liked`);
  res.send(`Restaurant ${restaurantId} liked`);
});

app.post('/restaurant/:id/dislike', (req, res) => {
  const restaurantId = req.params.id;
  console.log(`Restaurant ${restaurantId} disliked`);
  res.send(`Restaurant ${restaurantId} disliked`);
});


app.get('/restaurant/search', async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).send('Missing query parameter');
    }
    
    const searchResults = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(query.toLowerCase()));

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error searching for restaurant');
  }
});

module.exports = app;
