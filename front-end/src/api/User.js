import React, { createContext, useContext } from 'react';

export class User {
  constructor(id, email, profilePic="", likedRestaurants=[]) {
    this.id = id;
    this.email = email;
    this.profilePic = profilePic
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

  const API_KEY = process.env.REACT_APP_API_KEY
  if (!API_KEY) {
    console.log("UNDEFINED API_KEY");
    throw new Error("API_KEY undefined");
  }

  if (process.env.NODE_ENV == "production") fetchUrl = `http://backend/api/user?id=${email}`;
  else fetchUrl = `https://my.api.mockaroo.com/user.json?key=${API_KEY}`;

  const user = await fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      return User.from(data)
    })
    .catch(error => console.error('Error fetching user data:', error));
  return user;
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
