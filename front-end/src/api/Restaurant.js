import axios from 'axios';
import { BACKEND_URL } from './config';

export class Restaurant {
  constructor(id, name, description, location, link, images, pills) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
    this.link = link;
    this.images = images;
    this.pills = pills;
  }

  /**
   * Creates a Restaurant from a json response
   */
  static from(json) {
    return Object.assign(new Restaurant(), json);
  }
}

/**
 * A function for fetching a small collection of restaurants from the databse
 * Expects json data that has data.restaurants which is an array of restaurants
 *
 * @param userId - The authenticated user's id; function throws error if this is empty
 * @returns A Restaurant object from the desired restaurant
 */
export async function bulkFetchRestaurants(userId) {
  // if (!userId) throw new Error("Empty userId. Cannot fetch");
  const fetchUrl = `${BACKEND_URL}/restaurants`;

  const response = await axios.get(fetchUrl);
  const data = response.data;

  const restaurants = data.map((restaurantData) => Restaurant.from(restaurantData));
  return restaurants;
}

export async function searchRestaurants(query) {
  const fetchUrl = `${BACKEND_URL}/restaurant/search?query=${encodeURIComponent(query)}`;

  const response = await axios.get(fetchUrl);
  const data = response.data;

  const restaurants = data.map((restaurantData) => Restaurant.from(restaurantData));
  return restaurants;
}

export async function likeRestaurant(restaurantId) {
  const url = `${BACKEND_URL}/restaurant/${restaurantId}/like`;
  await axios.post(url);
}

export async function dislikeRestaurant(restaurantId) {
  const url = `${BACKEND_URL}/restaurant/${restaurantId}/dislike`;
  await axios.post(url);
}

export async function fetchLikedRestaurants(userId) {
  if (!userId) throw new Error("Empty userId. Cannot fetch");

  let fetchUrl = "";
  if (process.env.NODE_ENV === "production") fetchUrl = "http://backend/api/restaurant";
  if (process.env.NODE_ENV === "test") fetchUrl = "https://api.mockaroo.com/api";
  if (process.env.NODE_ENV === "development") return [];

  const response = await fetch(fetchUrl).then((response) => response.json);
  /* eslint-disable no-array-constructor */
  const restaurants = new Array();
  response.restaurants.map((restaurant) => {
    restaurants.push(Restaurant.from(restaurant));
  });
  return restaurants;
}

/**
 * Fetch a singular restaurant.
 * @param restaurantId - the ID of the restaurant
 * @returns a singular restaurant as type Restaurant
 */
export async function fetchRestaurant(restaurantId) {
  if (process.env.NODE_ENV !== "production") {
    return {

    };
  }
  if (!restaurantId) throw new Error("Empty restaurantId. Cannot fetch");

  let fetchUrl = "";
  if (process.env.NODE_ENV === "production") fetchUrl = `http://backend/api/restaurant?id=${restaurantId}`;

  else fetchUrl = "insert dummy api here";

  const response = await fetch(fetchUrl).then((response) => response.json);
  const restaurants = new Array();
  response.restaurants.map((restaurant) => {
    restaurants.push(Restaurant.from(restaurant));
  });
  return restaurants;
}

export async function addRestaurant(restaurantId) {

}
