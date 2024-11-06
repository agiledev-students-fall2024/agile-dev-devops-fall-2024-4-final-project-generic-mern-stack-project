import { app } from "../app";
import { google_places_controller } from "../controllers/google_places_controller";

// Fetch restaurants from Google Places
app.get('/restaurants', async (req, res) => {
  try {
    const location = '40.7685,-73.9822'; // Default coordinates
    const radius = 15000; // in meters

    let nearby_restaurants = await google_places_controller.get_nearby_restaurants(location, radius);

    // Limit to 60 results to manage API quotas
    nearby_restaurants = nearby_restaurants.slice(0, 60);

    // Fetch detailed information for each restaurant
    const detailed_results = [];

    // Control concurrency to avoid overwhelming the API
    const concurrency_limit = 5;
    const chunks = [];
    for (let i = 0; i < nearby_restaurants.length; i += concurrency_limit) {
      chunks.push(nearby_restaurants.slice(i, i + concurrency_limit));
    }

    for (const chunk of chunks) {
      const detail_promises = chunk.map(async place => {
        const place_id = place.place_id;
        const place_details = await google_places_controller.get_place_details(place_id);

        const name = place_details.name;
        const address = place_details.vicinity;
        const website = place_details.website;
        const summary = place_details.editorial_summary ? place_details.editorial_summary.overview : null;
        const photos = place_details.photos || [];

        const photo_urls = google_places_controller.get_photo_urls(photos);

        return {
          id: place_id,
          name,
          location:address,
          link:website,
          description:summary,
          images: photo_urls,
        };
      });

      const results = await Promise.all(detail_promises);
      detailed_results.push(...results);
    }

    res.json(detailed_results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching restaurants');
  }
});

// Like a restaurant
app.post('/restaurant/:id/like', (req, res) => {
  const restaurant_id = req.params.id;
  console.log(`Restaurant ${restaurant_id} liked`);
  res.send(`Restaurant ${restaurant_id} liked`);
});

// Dislike a restaurant
app.post('/restaurant/:id/dislike', (req, res) => {
  const restaurant_id = req.params.id;
  console.log(`Restaurant ${restaurant_id} disliked`);
  res.send(`Restaurant ${restaurant_id} disliked`);
});

// Search for a specific restaurant
app.get('/restaurant/search', async (req, res) => {
    try {
      const query = req.query.query;
  
      if (!query) {
        return res.status(400).send('Missing query parameter');
      }
  
      const search_results = await google_places_controller.search_restaurants_detailed(query);
  
      res.json(search_results);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error searching for restaurant');
    }
});
