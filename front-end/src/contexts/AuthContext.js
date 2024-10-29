import React, { createContext, useState, useContext } from "react";
import { AccountInfoContext } from "./AccountInfoContext";
import { fetchUser } from "../api/User";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setAccountInfo } = useContext(AccountInfoContext)

  const login = async (email) => {
    setIsAuthenticated(true);

    const user = await fetchUser(email)

    // This assumes that userData has the correct fields -Eric
    setAccountInfo(user)
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAccountInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
