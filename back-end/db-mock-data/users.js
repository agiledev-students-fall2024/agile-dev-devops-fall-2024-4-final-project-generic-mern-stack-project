const users = [
    {
      _id: "64b1c7c8f2a5b9a2d5c8f001", // user_123
      username: "john_doe",
      password: "password123", // Note: Should be hashed in a real application
      email: "john@example.com",
      name: "John Doe",
      profileAvatar: "😎",
      bio: "Travel enthusiast and food lover.",
      trips: [
        "64b1c7c8f2a5b9a2d5c8f100", // trip_456
        "64b1c7c8f2a5b9a2d5c8f101", // trip_789
        "64b1c7c8f2a5b9a2d5c8f103"  // trip_101
      ]
    },
    {
      _id: "64b1c7c8f2a5b9a2d5c8f002", // user_456
      username: "jane_smith",
      password: "password456", // Note: Should be hashed in a real application
      email: "jane@example.com",
      name: "Jane Smith",
      profileAvatar: "🌍",
      bio: "Explorer and photographer.",
      trips: [
        "64b1c7c8f2a5b9a2d5c8f100", // trip_456
        "64b1c7c8f2a5b9a2d5c8f103"  // trip_101
      ]
    },
    {
      _id: "64b1c7c8f2a5b9a2d5c8f003", // user_789
      username: "alex_wanderer",
      password: "password789", // Note: Should be hashed in a real application
      email: "alex@example.com",
      name: "Alex Wanderer",
      profileAvatar: "🧳",
      bio: "Always on the move.",
      trips: [
        "64b1c7c8f2a5b9a2d5c8f101", // trip_789
        "64b1c7c8f2a5b9a2d5c8f103"  // trip_101
      ]
    }
  ];
  
  export default users;
  