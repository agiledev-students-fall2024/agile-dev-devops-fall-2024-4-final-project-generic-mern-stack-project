const activities = [
    {
      _id: "64b1c7c8f2a5b9a2d5c8f304", // activity_005
      name: "Hiking at Yosemite",
      description: "Experience the beauty of Yosemite National Park.",
      locationId: "64b1c7c8f2a5b9a2d5c8f203", // location_004
      tripId: "64b1c7c8f2a5b9a2d5c8f101", // trip_789
      createdBy: "64b1c7c8f2a5b9a2d5c8f001", // user_123
      type: "activities", // Added type field
      votes: 20,
      price: 2,
      image: "https://picsum.photos/200/304",
      comments: [
        {
          _id: "64b1c7c8f2a5b9a2d5c8f500", // comment_009
          userId: "64b1c7c8f2a5b9a2d5c8f002", // user_456
          commentString: "Challenging hike but worth it!",
          createdAt: new Date()
        },
        {
          _id: "64b1c7c8f2a5b9a2d5c8f501", // comment_010
          userId: "64b1c7c8f2a5b9a2d5c8f003", // user_789
          commentString: "The views are stunning!",
          createdAt: new Date()
        }
      ],
      isCompleted: true
    },
    {
      _id: "64b1c7c8f2a5b9a2d5c8f305", // activity_006
      name: "Wine Tasting in Napa Valley",
      description: "Sample world-class wines.",
      locationId: "64b1c7c8f2a5b9a2d5c8f204", // location_005
      tripId: "64b1c7c8f2a5b9a2d5c8f102", // trip_123
      createdBy: "64b1c7c8f2a5b9a2d5c8f002", // user_456
      type: "food", // Added type field
      votes: 19,
      price: 4,
      image: "https://picsum.photos/200/305",
      comments: [
        {
          _id: "64b1c7c8f2a5b9a2d5c8f502", // comment_011
          userId: "64b1c7c8f2a5b9a2d5c8f001", // user_123
          commentString: "Loved the selection!",
          createdAt: new Date()
        }
      ],
      isCompleted: true
    },
    {
      _id: "64b1c7c8f2a5b9a2d5c8f303", // activity_004
      name: "Photo Shoot at Golden Gate Bridge",
      description: "Capture stunning shots of the iconic bridge.",
      locationId: "64b1c7c8f2a5b9a2d5c8f202", // location_003
      tripId: "64b1c7c8f2a5b9a2d5c8f101", // trip_789
      createdBy: "64b1c7c8f2a5b9a2d5c8f003", // user_789
      type: "activities", // Added type field
      votes: 10,
      price: 0,
      image: "https://picsum.photos/200/303",
      comments: [
        {
          _id: "64b1c7c8f2a5b9a2d5c8f503", // comment_007
          userId: "64b1c7c8f2a5b9a2d5c8f001", // user_123
          commentString: "Amazing photos!",
          createdAt: new Date()
        },
        {
          _id: "64b1c7c8f2a5b9a2d5c8f504", // comment_008
          userId: "64b1c7c8f2a5b9a2d5c8f002", // user_456
          commentString: "Perfect lighting in the morning!",
          createdAt: new Date()
        }
      ],
      isCompleted: false
    },
    {
      _id: "64b1c7c8f2a5b9a2d5c8f307", // activity_008
      name: "Surfing Lessons",
      description: "Learn to surf in the Pacific waves.",
      locationId: "64b1c7c8f2a5b9a2d5c8f205", // location_006
      tripId: "64b1c7c8f2a5b9a2d5c8f103", // trip_101
      createdBy: "64b1c7c8f2a5b9a2d5c8f003", // user_789
      type: "activities", // Added type field
      votes: 9,
      price: 3,
      image: "https://picsum.photos/200/307",
      comments: [
        {
          _id: "64b1c7c8f2a5b9a2d5c8f505", // comment_013
          userId: "64b1c7c8f2a5b9a2d5c8f002", // user_456
          commentString: "Exciting and challenging!",
          createdAt: new Date()
        },
        {
          _id: "64b1c7c8f2a5b9a2d5c8f506", // comment_014
          userId: "64b1c7c8f2a5b9a2d5c8f001", // user_123
          commentString: "A must-do on the coast!",
          createdAt: new Date()
        }
      ],
      isCompleted: false
    },
    {
      _id: "64b1c7c8f2a5b9a2d5c8f302", // activity_003
      name: "Empire State Observation Deck",
      description: "Get a stunning view of New York City from above.",
      locationId: "64b1c7c8f2a5b9a2d5c8f201", // location_002
      tripId: "64b1c7c8f2a5b9a2d5c8f100", // trip_456
      createdBy: "64b1c7c8f2a5b9a2d5c8f001", // user_123
      type: "activities", // Added type field
      votes: 8,
      price: 3,
      image: "https://picsum.photos/200/302",
      comments: [],
      isCompleted: true
    }
  ];
  
  export default activities;
  