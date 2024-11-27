const trips = [
  {
    _id: "64b1c7c8f2a5b9a2d5c8f100", // trip_456
    name: "New York Adventure",
    description: "Exploring NYC.",
    startDate: new Date("2024-12-01"), // Converted to Date object
    endDate: new Date("2024-12-10"),   // Converted to Date object
    participants: [
      "64b1c7c8f2a5b9a2d5c8f001", // user_123
      "64b1c7c8f2a5b9a2d5c8f002"  // user_456
    ],
    locations: [
      "64b1c7c8f2a5b9a2d5c8f200", // location_001
      "64b1c7c8f2a5b9a2d5c8f201"  // location_002
    ],
    status: "upcoming",
    image: "https://picsum.photos/200/300" // Optional image (not in schema but useful for visualization)
  },
  {
    _id: "64b1c7c8f2a5b9a2d5c8f101", // trip_789
    name: "California Road Trip",
    description: "Driving through California.",
    startDate: new Date("2024-11-15"),
    endDate: new Date("2024-11-25"),
    participants: [
      "64b1c7c8f2a5b9a2d5c8f001", // user_123
      "64b1c7c8f2a5b9a2d5c8f003"  // user_789
    ],
    locations: [
      "64b1c7c8f2a5b9a2d5c8f202", // location_003
      "64b1c7c8f2a5b9a2d5c8f203"  // location_004
    ],
    status: "upcoming",
    image: "https://picsum.photos/200/301"
  },
  {
    _id: "64b1c7c8f2a5b9a2d5c8f102", // trip_123
    name: "Wine and Mountains",
    description: "A journey through Napa and Yosemite.",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-10-10"),
    participants: [
      "64b1c7c8f2a5b9a2d5c8f001", // user_123
      "64b1c7c8f2a5b9a2d5c8f002", // user_456
      "64b1c7c8f2a5b9a2d5c8f003"  // user_789
    ],
    locations: [
      "64b1c7c8f2a5b9a2d5c8f203", // location_004
      "64b1c7c8f2a5b9a2d5c8f204"  // location_005
    ],
    status: "completed",
    image: "https://picsum.photos/200/302"
  },
  {
    _id: "64b1c7c8f2a5b9a2d5c8f103", // trip_101
    name: "West Coast Adventure",
    description: "Exploring the best beaches and surfing spots on the West Coast.",
    startDate: new Date("2024-10-15"),
    endDate: new Date("2024-10-25"),
    participants: [
      "64b1c7c8f2a5b9a2d5c8f001", // user_123
      "64b1c7c8f2a5b9a2d5c8f002", // user_456
      "64b1c7c8f2a5b9a2d5c8f003"  // user_789
    ],
    locations: [
      "64b1c7c8f2a5b9a2d5c8f205"  // location_006
    ],
    status: "ongoing",
    image: "https://picsum.photos/200/303"
  }
];

export default trips;
