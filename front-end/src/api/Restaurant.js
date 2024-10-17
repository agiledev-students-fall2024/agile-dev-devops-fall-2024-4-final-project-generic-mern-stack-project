export class Restaurant {
  constructor(id, name, cuisine, location) {
    this.id = id;
    this.name = name;
    this.cuisine = cuisine;
    this.location = location;
  }

  static from(json) {
    return Object.assign(new Restaurant(), json);
  }
}

const fakeRestaurants = [
  {
    imgs: [
      "https://res.cloudinary.com/the-infatuation/image/upload/c_fill,w_1200,ar_4:3,g_center,f_auto/images/Tatiana_Everything_DavidALee_NYC_005_n1hhaf",
      "https://static01.nyt.com/images/2023/03/15/multimedia/15rest-tatiana-06-lkjc/15rest-tatiana-06-lkjc-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      "https://static01.nyt.com/images/2023/03/15/multimedia/15rest-tatiana-09-lkjc/14rest-tatiana-09-lkjc-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
    ],
    name: "Tatiana by Kwame Onwuachi",
    description:
      "2022's buzziest restaurant is as good as you’ve heard, maybe even better. It follows Bronx-raised chef Kwame Onwuachi's D.C. restaurants, Top Chef season and James Beard award.",
    link: "https://www.tatiananyc.com/",
    pills: ["Upper West Side", "American", "Pan-American"],
  },
  {
    imgs: [
      "https://media.timeout.com/images/105782761/1536/864/image.webp",
      "https://res.cloudinary.com/the-infatuation/image/upload/c_fill,w_1200,ar_4:3,g_center,f_auto/cms/reviews/dhamaka/banners/1637348172.0021756",
      "https://images.squarespace-cdn.com/content/v1/5fc8f9afc1e8e65dddbbeb7f/86fe2117-0df6-473e-b4a4-e554ca2a222d/IMG_5357.jpeg?format=2500w",
    ],
    name: "Dhamaka",
    description:
      "NYC’s dazzling best new restaurant of 2021 with dishes seldom seen on local menus. ",
    link: "https://www.dhamaka.nyc/",
    pills: ["Lower East Side", "Indian"],
  },
];

/**
 * A function for fetching a singular restaurant from the databse
 * Expects json data that has data.restaurants which is an array of restaurants
 *
 * @param userId - The authenticated user's id; function throws error if this is empty
 * @returns A Restaurant object from the desired restaurant
 */
export async function fetchRestaurants(userId) {
  if (process.env.NODE_ENV !== "production") {
    return fakeRestaurants;
  }
  if (!userId) throw new Error("Empty restaurant name");

  let fetchUrl = "";
  if (process.env.NODE_ENV == "production")
    fetchUrl = "http://backend/api/restaurant";
  else fetchUrl = "insert dummy api here";

  const response = await fetch(fetchUrl).then((response) => response.json);
  const restaurants = new Array();
  response.restaurants.map((restaurant) => {
    restaurants.push(Restaurant.from(restaurant));
  });
  return restaurants;
}
