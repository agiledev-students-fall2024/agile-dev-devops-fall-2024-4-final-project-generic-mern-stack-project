import React, { useEffect, useState } from "react";

// Mock data for testing
const mockRoutes = [
  {
    id: 1,
    name: "Shopping Route 1",
    description: "A route through downtown stores.",
    stores: ["Store A", "Store B", "Store C", "Store D"],
  },
  {
    id: 2,
    name: "Shopping Route 2",
    description: "Best malls in the city.",
    stores: ["Store E", "Store F", "Store G"],
  },
  {
    id: 3,
    name: "Shopping Route 3",
    description: "Explore local markets.",
    stores: ["Store H", "Store I", "Store J"],
  },
];

const SavedRoutesList = () => {
  const [routes, setRoutes] = useState(mockRoutes);

  // Uncomment below if fetching from an API
  // useEffect(() => {
  //   fetch("/api/routes")
  //     .then((response) => response.json())
  //     .then((data) => setRoutes(data))
  //     .catch((error) => console.error("Error fetching routes:", error));
  // }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img src="/logo.png" alt="Logo" style={styles.logo} />
        <h2>Saved Routes</h2>
      </header>

      <div style={styles.routeList}>
        {routes.map((route) => (
          <div key={route.id} style={styles.routeCard}>
            <h3>{route.name}</h3>
            <p>{route.description}</p>
            <p><strong>Stores:</strong> {route.stores.join(", ")}</p>
          </div>
        ))}
      </div>

      <button style={styles.backButton} onClick={() => window.history.back()}>Back to Start</button>
    </div>
  );
};

// Inline styles for simplicity; move to a CSS/SCSS file if preferred
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f0f0f0",
  },
  header: {
    marginBottom: "20px",
  },
  logo: {
    width: "100px",
    marginBottom: "10px",
  },
  routeList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  routeCard: {
    border: "1px solid #ccc",
    padding: "15px",
    backgroundColor: "#fff",
    textAlign: "left",
  },
  backButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#ccc",
    border: "none",
    cursor: "pointer",
  },
};

export default SavedRoutesList;
