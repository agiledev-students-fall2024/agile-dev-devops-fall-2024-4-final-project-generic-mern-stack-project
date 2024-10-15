export class Restaurant {
  
  constructor(name, cuisine, location) {
    this.id = id;
    this.name = name;
    this.cuisine = cuisine
    this.location = location
  }

  static from(json) {
    return Object.assign(new Restaurant, json);
  }
}

/**
 * A function for fetching a singular restaurant from the databse
 * Expects json data that has data.restaurants which is an array of restaurants
 *
 * @param userId - The authenticated user's id; function throws error if this is empty
 * @returns A Restaurant object from the desired restaurant
 */
export async function fetchRestaurants(userId) {

  if (!userId) throw new Error("Empty restaurant name");

  let fetchUrl = ""
  if (process.env.NODE_ENV == "production") fetchUrl = "http://backend/api/restaurant";
  else fetchUrl = "insert dummy api here";

  const response = await fetch(fetchUrl).then(response => response.json)
  const restaurants = new Array();
  response.restaurants.map((restaurant) => {
    restaurants.push(Restaurant.from(restaurant))
  })
  return restaurants;
}
