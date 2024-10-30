import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <ProfileContext.Provider value={{ user, setUser }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);