const express = require("express");
const router = express.Router();
const restaurants = require("../../restaurants");

// Get all restaurants with pagination, filtering, and query params
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, cuisine, neighborhood } = req.query;

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const cuisineArray = cuisine ? cuisine.split(",").map(c => c.toLowerCase()) : [];
    const neighborhoodArray = neighborhood ? neighborhood.split(",").map(n => n.toLowerCase()) : [];

    let filteredRestaurants = restaurants;

    if (cuisineArray.length > 0) {
      filteredRestaurants = filteredRestaurants.filter(restaurant =>
        restaurant.cuisine && cuisineArray.includes(restaurant.cuisine.toLowerCase())
      );
    }

    if (neighborhoodArray.length > 0) {
      filteredRestaurants = filteredRestaurants.filter(restaurant =>
        restaurant.neighborhood && neighborhoodArray.includes(restaurant.neighborhood.toLowerCase())
      );
    }

    const startIndex = (pageInt - 1) * limitInt;
    const paginatedRestaurants = filteredRestaurants.slice(startIndex, startIndex + limitInt);

    res.json({
      total: filteredRestaurants.length,
      page: pageInt,
      limit: limitInt,
      data: paginatedRestaurants,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching restaurants");
  }
});

// Like a restaurant
router.post("/:id/like", (req, res) => {
  const restaurantId = req.params.id;
  console.log(`Restaurant ${restaurantId} liked`);
  res.send(`Restaurant ${restaurantId} liked`);
});

// Dislike a restaurant
router.post("/:id/dislike", (req, res) => {
  const restaurantId = req.params.id;
  console.log(`Restaurant ${restaurantId} disliked`);
  res.send(`Restaurant ${restaurantId} disliked`);
});


router.get("/search", async (req, res) => {
    try {
      const query = req.query.query;
  
      if (!query) {
        return res.status(400).send("Missing query parameter");
      }
  
      const searchResults = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase())
      );
  
      res.json(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error searching for restaurant");
    }
  });


module.exports = router;
