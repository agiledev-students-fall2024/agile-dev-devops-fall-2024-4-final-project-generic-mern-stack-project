import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

/*
USAGE EXAMPLE

import { useUser } from './api/User';

function Profile() {
  const user = useUser();

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>You have {user.followers} followers.</p>
    </div>
  );
}
 */

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let fetchUrl = ""
    if (process.env.NODE_ENV == "production") fetchUrl = "http://backend/api/user";
    else fetchUrl = "insert dummy api here";

    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function AuthenticatedUser() {
  return useContext(UserContext);
}
