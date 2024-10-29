import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export class User {
  constructor(id, email, likedRestaurants=[]) {
    this.id = id;
    this.name = email;
    this.likedRestaurants = this.likedRestaurants;
  }

  /**
   * Creates a User from a json response
   */
  static from(json) {
    return Object.assign(new User(), json);
  }
}

export async function fetchUser(email) {
  let fetchUrl = ""

  if (process.env.NODE_ENV == "production") fetchUrl = `http://backend/api/user?id=${email}`;
  if (process.env.NODE_ENV == "test") fetchUrl = `https://api.mockaroo.com/api/user?id=${email}`;
  if (process.env.NODE_ENV == "development") {
    return new User("123","Amos Bloomberg","123-456-7890",[])
  }

  return await fetch(fetchUrl)
    .then(response => response.json())
    .then(data => User.from(data.json))
    .catch(error => console.error('Error fetching user data:', error));
}

export async function registerUser(email) {
  return await fetch("http://backend/api/user", {
    method: "POST",
    body: {email: email}
  })
    .then(response => response.json())
    .then((data) => User.from(data.json))
    .catch(error => console.error('Error fetching user data:', error));
}

export function AuthenticatedUser() {
  return useContext(UserContext);
}
