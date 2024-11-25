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