const express = require("express");
require("dotenv").config({ silent: true });
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const googlePlacesController = require('./googlePlacesController');

// Fetch restaurants from Google Places
app.get('/restaurants', async (req, res) => {
  try {
    const location = '40.7685,-73.9822'; // Default coordinates
    const radius = 15000; // in meters

    let nearbyRestaurants = await googlePlacesController.getNearbyRestaurants(location, radius);

    // Limit to 60 results to manage API quotas
    nearbyRestaurants = nearbyRestaurants.slice(0, 60);

    // Fetch detailed information for each restaurant
    const detailedResults = [];

    // Control concurrency to avoid overwhelming the API
    const concurrencyLimit = 5;
    const chunks = [];
    for (let i = 0; i < nearbyRestaurants.length; i += concurrencyLimit) {
      chunks.push(nearbyRestaurants.slice(i, i + concurrencyLimit));
    }

    for (const chunk of chunks) {
      const detailPromises = chunk.map(async place => {
        const placeId = place.place_id;
        const placeDetails = await googlePlacesController.getPlaceDetails(placeId);

        const name = placeDetails.name;
        const address = placeDetails.vicinity;
        const website = placeDetails.website;
        const summary = placeDetails.editorial_summary ? placeDetails.editorial_summary.overview : null;
        const photos = placeDetails.photos || [];

        const photoUrls = googlePlacesController.getPhotoUrls(photos);

        return {
          id: placeId,
          name,
          location:address,
          link:website,
          description:summary,
          images: photoUrls,
        };
      });

      const results = await Promise.all(detailPromises);
      detailedResults.push(...results);
    }

    res.json(detailedResults);
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

// Dislike a restaurant
app.post('/restaurant/:id/dislike', (req, res) => {
  const restaurantId = req.params.id;
  console.log(`Restaurant ${restaurantId} disliked`);
  res.send(`Restaurant ${restaurantId} disliked`);
});

// Search for a specific restaurant
app.get('/restaurant/search', async (req, res) => {
    try {
      const query = req.query.query;
  
      if (!query) {
        return res.status(400).send('Missing query parameter');
      }
  
      const searchResults = await googlePlacesController.searchRestaurantsDetailed(query);
  
      res.json(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error searching for restaurant');
    }
  });

app.get("/", (req, res) => {
  res.send("Hello!");
});

module.exports = app;
