import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem('token') || null);
  const [username, setUsername] = React.useState(localStorage.getItem('username') || null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const login = (newToken, newUsername) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', newUsername);
    setToken(newToken); // Update the token state
    setUsername(newUsername); // Update the username state
    setIsAuthenticated(true);
    navigate('/'); // Redirect to home
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null); // Clear the token state
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;



/*
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true);
    navigate('/')
  };

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    navigate('/login')
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
*/