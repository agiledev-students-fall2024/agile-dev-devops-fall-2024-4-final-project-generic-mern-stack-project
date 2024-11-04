const axios = require('axios');

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Fetch nearby restaurants
async function getNearbyRestaurants(location, radius) {
  let results = [];
  let nextPageToken = null;
  let iterations = 0;

  do {
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=restaurant&key=${API_KEY}`;
    if (nextPageToken) {
      url += `&pagetoken=${nextPageToken}`;
    }

    const response = await axios.get(url);
    const data = response.data;

    results = results.concat(data.results);
    nextPageToken = data.next_page_token;
    iterations += 1;

    // Wait for nextPageToken to become valid
    if (nextPageToken) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  } while (nextPageToken && iterations < 2);

  return results;
}

// Fetch detailed information for a place
async function getPlaceDetails(placeId) {
  const fields = 'name,website,photos,editorial_summary,vicinity';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;

  const response = await axios.get(url);
  const data = response.data;

  if (data.status !== 'OK') {
    throw new Error(`Error fetching place details: ${data.status}`);
  }

  return data.result;
}

// Generate photo URLs from photo references
function getPhotoUrls(photos) {
  return photos.map(photo => {
    const photoReference = photo.photo_reference;
    if (photoReference) {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}`;
    }
    return null;
  }).filter(url => url !== null);
}

// Search for restaurants by query
async function searchRestaurantsDetailed(query) {
    let results = [];
    let nextPageToken = null;
    let iterations = 0;
  
    do {
      let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
      if (nextPageToken) {
        url += `&pagetoken=${nextPageToken}`;
      }
  
      const response = await axios.get(url);
      const data = response.data;
  
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Error searching for restaurants: ${data.status}`);
      }
  
      results = results.concat(data.results);
      nextPageToken = data.next_page_token;
      iterations += 1;
  
      // Wait for nextPageToken to become valid
      if (nextPageToken) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } while (nextPageToken && iterations < 3);
  
    // Limit the number of results to manage API usage
    results = results.slice(0, 60);
  
    // Fetch detailed information for each result
    const detailedResults = [];
  
    // Control concurrency to avoid rate limits
    const concurrencyLimit = 5;
    const chunks = [];
    for (let i = 0; i < results.length; i += concurrencyLimit) {
      chunks.push(results.slice(i, i + concurrencyLimit));
    }
  
    for (const chunk of chunks) {
      const detailPromises = chunk.map(async place => {
        const placeId = place.place_id;
        const placeDetails = await getPlaceDetails(placeId);
  
        const name = placeDetails.name;
        const address = placeDetails.vicinity;
        const website = placeDetails.website;
        const summary = placeDetails.editorial_summary ? placeDetails.editorial_summary.overview : null;
        const photos = placeDetails.photos || [];
  
        const photoUrls = getPhotoUrls(photos);
  
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
  
    return detailedResults;
  }

module.exports = {
  getNearbyRestaurants,
  getPlaceDetails,
  getPhotoUrls,
  searchRestaurantsDetailed,
};
