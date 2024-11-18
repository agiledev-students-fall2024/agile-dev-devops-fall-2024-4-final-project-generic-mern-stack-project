import axios from "axios";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Fetch nearby restaurants
async function get_nearby_restaurants(location, radius) {
  let results = [];
  let next_page_token = null;
  let iterations = 0;

  do {
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=restaurant&key=${API_KEY}`;
    if (next_page_token) {
      url += `&pagetoken=${next_page_token}`;
    }

    const response = await axios.get(url);
    const data = response.data;

    results = results.concat(data.results);
    next_page_token = data.next_page_token;
    iterations += 1;

    // Wait for nextPageToken to become valid
    if (next_page_token) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  } while (next_page_token && iterations < 2);

  return results;
}

// Fetch detailed information for a place
async function get_place_details(place_id) {
  const fields = 'name,website,photos,editorial_summary,vicinity';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=${fields}&key=${API_KEY}`;

  const response = await axios.get(url);
  const data = response.data;

  if (data.status !== 'OK') {
    throw new Error(`Error fetching place details: ${data.status}`);
  }

  return data.result;
}

// Generate photo URLs from photo references
function get_photo_urls(photos) {
  return photos.map(photo => {
    const photo_reference = photo.photo_reference;
    if (photo_reference) {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&key=${API_KEY}`;
    }
    return null;
  }).filter(url => url !== null);
}

// Search for restaurants by query
async function search_restaurants_detailed(query) {
    let results = [];
    let next_page_token = null;
    let iterations = 0;
  
    do {
      let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
      if (next_page_token) {
        url += `&pagetoken=${next_page_token}`;
      }
  
      const response = await axios.get(url);
      const data = response.data;
  
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Error searching for restaurants: ${data.status}`);
      }
  
      results = results.concat(data.results);
      next_page_token = data.next_page_token;
      iterations += 1;
  
      // Wait for nextPageToken to become valid
      if (next_page_token) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } while (next_page_token && iterations < 3);
  
    // Limit the number of results to manage API usage
    results = results.slice(0, 60);
  
    // Fetch detailed information for each result
    const detailed_results = [];
  
    // Control concurrency to avoid rate limits
    const concurrency_limit = 5;
    const chunks = [];
    for (let i = 0; i < results.length; i += concurrency_limit) {
      chunks.push(results.slice(i, i + concurrency_limit));
    }
  
    for (const chunk of chunks) {
      const detail_promises = chunk.map(async place => {
        const place_id = place.place_id;
        const place_details = await get_place_details(place_id);
  
        const name = place_details.name;
        const address = place_details.vicinity;
        const website = place_details.website;
        const summary = place_details.editorial_summary ? place_details.editorial_summary.overview : null;
        const photos = place_details.photos || [];
  
        const photo_urls = get_photo_urls(photos);
  
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
  
    return detailed_results;
  }

export {
  get_nearby_restaurants,
  get_place_details,
  get_photo_urls,
  search_restaurants_detailed,
};
