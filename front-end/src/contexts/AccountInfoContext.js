import React, { createContext, useState } from "react";

/* eslint-disable no-unused-vars */

const fakeRestaurants = [
  {
    id: 1,
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
    id: 2,
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
  {
    id: 3,
    imgs: [
      "https://media.timeout.com/images/105815302/750/422/image.jpg",
      "https://images.ctfassets.net/1aemqu6a6t65/7raC7hacPOfbUFCl8gj29V/405e23a8b91f184ce4ac9635e503144f/gagetollner-manhattan-photo-courtesy-.jpg",
    ],
    name: "Gage & Tollner",
    description:
      "At once an emblem of Old New York and a relative newcomer, Gage & Tollner was revived well over a century after first opening at this location in 1892. A trio of Brooklyn hospitality pros, including chef Sohui Kim, reopened the august institution to quick acclaim in 2021. ",
    link: "https://www.gageandtollner.com/",
    pills: ["Downtown Brooklyn", "American"],
  },
  {
    id: 4,
    imgs: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqQ98MuY-vFz8NS0Gh5xHwdu31AjYf48kEkg&s",
      "https://images.squarespace-cdn.com/content/v1/607d95468ee6257ceab9d30a/393d2748-2163-464f-96fb-38db1bc2dcdb/Rezdora+Interior.jpg",
    ],
    name: "Rezdôra",
    description:
      "New York City's best Italian restaurant. Rezdôra follows chef Stefano Secchi's turn at highly-regarded Osteria Francescana in Modena, Italy.",
    link: "https://www.rezdora.nyc/",
    pills: ["Flatiron", "Italian"],
  },
  {
    id: 5,
    imgs: [
      "https://media.timeout.com/images/105551218/1024/576/image.webp",
      "https://axwwgrkdco.cloudimg.io/v7/__gmpics3__/77e772bbe43e4b99ae60ed9d53c3f898.jpeg?width=1000",
    ],
    name: "Kochi",
    description:
      "Per se alum chef Sungchul Shim’s $145 nine-course tasting of skewers inspired by Korean royal court cuisine. A sool pairing is also available for $105.",
    link: "https://www.kochinyc.com/",
    pills: ["Hell's Kitchen", "Korean"],
  },
  {
    id: 6,
    imgs: [
      "https://media.timeout.com/images/106157946/1024/576/image.webp",
      "https://images.squarespace-cdn.com/content/v1/615bedc264a4c3392b97d4d8/53dcef30-3802-47cb-832f-863cb67017ac/Semma+Table.jpeg",
    ],
    name: "Semma",
    description:
      "Another win from the Unapologetic Foods crew, Semma brings the rural cuisine of Southern Indian cuisine to Greenwich Village. The Michelin Guide is also a fan, as the restaurant is currently the only Michelin-starred Indian restaurant in the country.",
    link: "https://www.semma.nyc/",
    pills: ["West Village", "Indian"],
  },
  {
    id: 7,
    imgs: [
      "https://i.redd.it/h8k78ru2ltp81.jpg",
      "https://media.timeout.com/images/101435865/1024/576/image.webp",
    ],
    name: "Sushi Nakazawa",
    description:
      "Incredible omakase from Jiro Dreams of Sushi’s chef Daisuke Nakazawa.",
    link: "https://www.sushinakazawa.com/",
    pills: ["West Village", "Japanese"],
  },
  {
    id: 8,
    imgs: [
      "https://media.timeout.com/images/105538027/1024/576/image.webp",
      "https://dineseat.com/cdn/shop/files/Bretzel_20Carota_20CF032572.jpg?v=1707243463",
    ],
    name: "Via Carota",
    description:
      "This cozy Italian restaurant, run by the chef power couple of Jody Williams and Rita Sodi, is a rustic, sophisticated and heart-swelling gem.",
    link: "https://www.viacarota.com/",
    pills: ["West Village", "Italian"],
  },
  {
    id: 9,
    imgs: [
      "https://media.timeout.com/images/105905305/1024/576/image.webp",
      "https://pyxis.nymag.com/v1/imgs/a57/867/d34af20c204566594679cb076414e42d91-crown-shy-scott-heins-12.rhorizontal.w1100.jpg",
    ],
    name: "Crown Shy",
    description:
      "An excellent entrée to NYC’s nicer-than-normal restaurants, Crown Shy is as suitable for a special occasion as it is for an evening that unexpectedly turns a bit fancy. The 2019 opening was the first solo venture from the late great James Kent.",
    link: "https://www.crownshy.nyc/",
    pills: ["Fidi", "American"],
  },
];

export const AccountInfoContext = createContext();

export const AccountInfoProvider = ({ children }) => {
  const [accountInfo, setAccountInfo] = useState({
    username: "JohnDoe",
    email: "john.doe@example.com",
    likedRestaurants: [],
    filters: [], // <-- Manage filters here
    search: "",
  });

  const [allrestaurants, setAllRestaurants] = useState(fakeRestaurants);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(fakeRestaurants);

    const addLikedRestaurant = (restaurant) => {
      setAccountInfo((prev) => {
        // Check if the restaurant is already in the likedRestaurants array
        const isAlreadyLiked = prev.likedRestaurants.some(
          (likedRestaurant) => likedRestaurant.id === restaurant.id
        );
  
        // If it's not already liked, add it to the array
        if (!isAlreadyLiked) {
          return {
            ...prev,
            likedRestaurants: [...prev.likedRestaurants, restaurant],
          };
        }
  
        // If it's already liked, return the previous state without changes
        return prev;
      });
    };
  

  const setFilters = (filters) => {
    setAccountInfo((prev) => ({
      ...prev,
      filters,
    }));
  };

  const setSearch = (search) => {
    setAccountInfo((prev) => ({
      ...prev,
      search,
    }));
  };

  return (
    <AccountInfoContext.Provider
      value={{
        accountInfo,
        setAccountInfo,
        addLikedRestaurant,
        setFilters,
        setSearch,
        allrestaurants,
        filteredRestaurants,
        setFilteredRestaurants,
      }}
    >
      {children}
    </AccountInfoContext.Provider>
  );
};
